#!/bin/bash

echo "🔧 Applying fixes for email notification issues..."
echo ""

# Add the fixed files
git add .github/workflows/update-browserslist.yml
git add .github/dependabot.yml
git add FIX_NOTIFICATION_ISSUE.md
git add QUICK_FIX_COMMANDS.sh

# Commit
git commit -m "fix: resolve workflow bun conflict and remove non-existent labels

- Change workflow to use npm update instead of npx update-browserslist-db
- Remove automated and github-actions labels that don't exist
- This fixes GitHub Actions failures and Dependabot label errors"

# Push
echo ""
echo "📤 Pushing fixes to GitHub..."
git push origin main

echo ""
echo "✅ Done! The fixes have been pushed."
echo ""
echo "Next steps:"
echo "1. Go to GitHub and close the Dependabot PRs (they'll be recreated)"
echo "2. Check Actions tab - workflow should now succeed"
echo "3. Adjust GitHub notification settings to reduce emails"
echo ""
echo "See FIX_NOTIFICATION_ISSUE.md for detailed instructions."
