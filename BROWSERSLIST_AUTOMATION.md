# Browserslist Automation Documentation

This document explains the automated browserslist database update system implemented in this project.

## 🎯 Purpose

The browserslist database (caniuse-lite) contains browser compatibility data used by tools like Autoprefixer, Babel, and other build tools. This data becomes outdated as new browser versions are released, which can lead to:

- Inaccurate CSS prefixing
- Suboptimal transpilation
- Misleading compatibility warnings
- Build warnings about outdated data

This automation ensures your browserslist database stays up-to-date automatically.

## 🔧 How It Works

### 1. **Automatic Updates on Every Build**

The browserslist database is automatically updated before every production build:

```bash
npm run build
```

This is handled by the `update-browserslist` script in `package.json` which runs before the Vite build process.

### 2. **Post-Install Updates**

After running `npm install` or `npm ci`, the database is automatically checked and updated if needed:

```bash
npm install
# Automatically runs: node scripts/update-browserslist.js
```

### 3. **GitHub Actions Workflow**

A scheduled GitHub Actions workflow (`update-browserslist.yml`) runs:

- **Weekly**: Every Monday at 3:00 AM UTC
- **On demand**: Manual trigger via GitHub Actions UI
- **On dependency changes**: When `package.json` or `package-lock.json` changes

**What the workflow does:**
- Checks for browserslist updates
- Creates a Pull Request if updates are available
- Includes detailed changelog and reasoning
- Labels the PR for easy identification

### 4. **Dependabot Integration**

Dependabot is configured to automatically:

- Update npm dependencies weekly
- Specifically monitor `caniuse-lite` and `browserslist` packages
- Group minor/patch updates to reduce PR noise
- Keep GitHub Actions up-to-date

## 📁 Files Added

```
.github/
├── workflows/
│   └── update-browserslist.yml    # GitHub Actions workflow
├── dependabot.yml                 # Dependabot configuration
scripts/
└── update-browserslist.js         # Update script with smart checks
```

## 🚀 Manual Commands

### Check and Update Now

```bash
npm run update-browserslist
```

### Force Update (Skip Age Check)

```bash
npm run update-browserslist:force
```

### Update Directly with npx

```bash
npx update-browserslist-db@latest
```

## 🔍 Script Features

The `scripts/update-browserslist.js` script includes:

- **Smart Age Detection**: Only updates if database is >6 months old
- **CI/CD Awareness**: Skips redundant updates in CI environments
- **Vercel Integration**: Always updates on Vercel deployments
- **Error Handling**: Graceful failures that don't break builds
- **Color-coded Output**: Easy-to-read terminal messages
- **Silent Mode**: Minimal output when database is current

## 🌐 Vercel Deployment

On Vercel, the browserslist database is updated automatically during every deployment because:

1. The `postinstall` script runs after dependencies are installed
2. The `build` command includes the update step
3. The script detects the Vercel environment and ensures updates run

**No additional configuration needed in Vercel!**

## ⚙️ Environment Variables

Optional environment variables to control behavior:

| Variable | Description | Default |
|----------|-------------|---------|
| `FORCE_BROWSERSLIST_UPDATE` | Force update regardless of age | `false` |
| `CI` | Detected automatically in CI environments | auto-detected |
| `VERCEL` | Detected automatically on Vercel | auto-detected |

Example:

```bash
FORCE_BROWSERSLIST_UPDATE=true npm run build
```

## 🛠 Customization

### Change Update Frequency (GitHub Actions)

Edit `.github/workflows/update-browserslist.yml`:

```yaml
schedule:
  # Change from weekly to daily
  - cron: '0 3 * * *'  # Every day at 3 AM UTC
```

### Change Age Threshold

Edit `scripts/update-browserslist.js`:

```javascript
// Change from 6 months to 3 months
const monthsOld = (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
return monthsOld > 3; // Update if older than 3 months
```

### Disable Specific Automation

**Disable postinstall updates:**

Remove from `package.json`:
```json
"postinstall": "node scripts/update-browserslist.js"
```

**Disable pre-build updates:**

Change in `package.json`:
```json
"build": "vite build"
```

## 📊 Monitoring

### GitHub Actions

1. Go to your repository on GitHub
2. Click **Actions** tab
3. View **Update Browserslist Database** workflow runs

### Pull Requests

Automated PRs will have:
- Title: "🤖 Update Browserslist Database"
- Labels: `dependencies`, `automated`, `maintenance`
- Detailed changelog in the PR description

## 🔐 Permissions

The GitHub Actions workflow requires:

- `contents: write` - To commit changes
- `pull-requests: write` - To create PRs

These are automatically granted when using `GITHUB_TOKEN`.

## 🐛 Troubleshooting

### Warning Still Appears

If you still see the warning after setting this up:

1. **Manually run the update once:**
   ```bash
   npm run update-browserslist:force
   ```

2. **Commit the changes:**
   ```bash
   git add package-lock.json
   git commit -m "chore: update browserslist database"
   git push
   ```

3. **Rebuild:**
   ```bash
   npm run build
   ```

### Script Fails in CI

The script is designed to fail gracefully. If it fails:

- Check Node.js version (requires Node 14+)
- Ensure `package-lock.json` exists
- Verify npm registry access

### Workflow Doesn't Create PRs

Ensure your repository settings allow:

1. **Settings** → **Actions** → **General**
2. Enable: "Allow GitHub Actions to create pull requests"

## 📚 Additional Resources

- [Browserslist Documentation](https://github.com/browserslist/browserslist)
- [update-browserslist-db Package](https://github.com/browserslist/update-db)
- [Why Update Regularly](https://github.com/browserslist/update-db#readme)
- [Vercel Build Process](https://vercel.com/docs/deployments/configure-a-build)

## ✅ Benefits

- **Zero Manual Effort**: Fully automated updates
- **Always Current**: Weekly scheduled updates
- **Build Optimization**: Accurate browser targeting
- **Security**: Regular dependency updates via Dependabot
- **Transparency**: All updates via reviewable PRs
- **No Build Failures**: Graceful error handling

---

**Status**: ✅ Fully Automated  
**Maintenance Required**: None (self-maintaining)  
**Next Action**: Push changes to GitHub and enable Actions