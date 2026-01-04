#!/usr/bin/env node

/**
 * Automated Browserslist Database Updater
 * 
 * This script updates the caniuse-lite database to ensure
 * accurate browser compatibility data during builds.
 * 
 * It runs silently unless there's an error or update needed.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  dim: '\x1b[2m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkDatabaseAge() {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const packageLockPath = path.join(projectRoot, 'package-lock.json');
    
    if (!fs.existsSync(packageLockPath)) {
      log('⚠️  package-lock.json not found. Skipping browserslist check.', 'yellow');
      return false;
    }

    // Check if caniuse-lite exists
    const caniusePath = path.join(projectRoot, 'node_modules', 'caniuse-lite');
    if (!fs.existsSync(caniusePath)) {
      log('ℹ️  caniuse-lite not yet installed. Will update after installation.', 'blue');
      return false;
    }

    const packageJsonPath = path.join(caniusePath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return false;
    }

    const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check package version date from package-lock.json
    const lockData = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
    const caniuseLockEntry = lockData.packages?.['node_modules/caniuse-lite'];
    
    if (caniuseLockEntry?.version) {
      // Version format is like 1.0.30001234
      // The last part is the release number which increases over time
      const currentVersion = parseInt(caniuseLockEntry.version.split('.').pop());
      
      // If we can't determine age by version, assume it's old enough to check
      if (isNaN(currentVersion)) {
        return true;
      }
      
      // Check if version is significantly old (version increments daily)
      // If less than version from ~6 months ago, update
      return currentVersion < 30001600; // Approximate version from 6 months ago
    }

    return true; // Default to updating if we can't determine
  } catch (error) {
    // Silently skip checks if there's an error
    return false;
  }
}

function updateDatabase() {
  try {
    log('🔄 Updating browserslist database...', 'blue');
    
    const projectRoot = path.resolve(__dirname, '..');
    
    // Use direct npm update for caniuse-lite and browserslist
    execSync('npm update caniuse-lite browserslist --no-save', {
      stdio: 'pipe',
      cwd: projectRoot,
    });

    log('✅ Browserslist database updated successfully!', 'green');
    return true;
  } catch (error) {
    // Try alternative method: reinstall packages
    try {
      log('⚠️  Trying alternative update method...', 'yellow');
      const projectRoot = path.resolve(__dirname, '..');
      
      execSync('npm install caniuse-lite browserslist --no-save', {
        stdio: 'pipe',
        cwd: projectRoot,
      });
      
      log('✅ Browserslist database updated successfully!', 'green');
      return true;
    } catch (fallbackError) {
      log('❌ Failed to update browserslist database:', 'red');
      log('⚠️  Continuing with existing database...', 'yellow');
      return false;
    }
  }
}

function main() {
  const isCI = process.env.CI === 'true';
  const isVercel = process.env.VERCEL === '1';
  const forceUpdate = process.env.FORCE_BROWSERSLIST_UPDATE === 'true';

  // Skip in CI unless forced (GitHub Actions workflow handles it)
  if (isCI && !forceUpdate && !isVercel) {
    log('ℹ️  Skipping browserslist update in CI (handled by workflow)', 'dim');
    return;
  }

  if (forceUpdate || checkDatabaseAge()) {
    updateDatabase();
  } else {
    log('✓ Browserslist database is up to date', 'dim');
  }
}

// Run the script
main();
