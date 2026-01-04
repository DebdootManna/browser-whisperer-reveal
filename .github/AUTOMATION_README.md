# 🤖 Browserslist Automation - Quick Reference

This project includes **fully automated** browserslist database updates. You'll never see the "caniuse-lite is X months old" warning again!

## ✅ What's Automated

### 1. **Every Build** 
```bash
npm run build
```
Automatically updates browserslist before building. ✨ Zero configuration needed.

### 2. **Every Install**
```bash
npm install
```
Checks and updates browserslist database after installing dependencies.

### 3. **Weekly via GitHub Actions**
- Runs every Monday at 3:00 AM UTC
- Creates a Pull Request if updates are available
- Can be triggered manually from the Actions tab

### 4. **On Vercel Deployments**
- Automatically updates during every Vercel build
- No Vercel configuration required

## 🚀 Manual Commands

| Command | Description |
|---------|-------------|
| `npm run update-browserslist` | Check and update if needed |
| `npm run update-browserslist:force` | Force update regardless of age |
| `npx update-browserslist-db@latest` | Direct update (may have bun conflicts) |

## 📂 Files Added

```
.github/
├── workflows/
│   └── update-browserslist.yml    # Weekly automation
├── dependabot.yml                 # Dependency updates
└── AUTOMATION_README.md           # This file

scripts/
└── update-browserslist.js         # Smart update script

vercel.json                        # Vercel configuration
BROWSERSLIST_AUTOMATION.md         # Detailed documentation
```

## 🔧 How It Works

The automation uses a smart script that:

1. ✓ Checks if the database is older than 6 months
2. ✓ Skips unnecessary updates to save time
3. ✓ Handles errors gracefully (won't break builds)
4. ✓ Works with npm (avoids bun conflicts)
5. ✓ Provides color-coded terminal output

## 🎯 First-Time Setup

After pushing these changes to GitHub:

1. **Enable GitHub Actions**
   - Go to your repo → Settings → Actions → General
   - Enable "Allow GitHub Actions to create and approve pull requests"

2. **Verify Dependabot**
   - Go to Security → Dependabot
   - Ensure Dependabot alerts are enabled

3. **Test the workflow**
   - Go to Actions tab
   - Select "Update Browserslist Database"
   - Click "Run workflow"

That's it! Everything else is automatic.

## 🐛 Troubleshooting

### Still seeing the warning?

Run this once:
```bash
npm run update-browserslist:force
git add package-lock.json
git commit -m "chore: update browserslist database"
git push
```

### Script fails?

The script is designed to fail gracefully. Your builds will continue working with the existing database.

### Workflow not creating PRs?

Check: Settings → Actions → General → "Allow GitHub Actions to create pull requests" is enabled.

## 📊 Monitoring

- **GitHub Actions**: Check the Actions tab for workflow runs
- **Pull Requests**: Automated PRs will have labels: `dependencies`, `automated`, `maintenance`
- **Build logs**: Look for colored status messages during builds

## ⚙️ Customization

### Change update frequency

Edit `.github/workflows/update-browserslist.yml`:

```yaml
schedule:
  - cron: '0 3 * * *'  # Daily instead of weekly
```

### Change age threshold

Edit `scripts/update-browserslist.js`, line 78:

```javascript
return currentVersion < 30001700; // More recent threshold
```

### Disable auto-updates

Remove from `package.json`:
```json
"postinstall": "node scripts/update-browserslist.js",
```

## 📚 Documentation

For complete documentation, see [BROWSERSLIST_AUTOMATION.md](../BROWSERSLIST_AUTOMATION.md)

## ✨ Benefits

- ✅ **Zero manual maintenance** - Fully automated
- ✅ **Always up-to-date** - Weekly checks + build-time updates
- ✅ **No build failures** - Graceful error handling
- ✅ **Transparent** - All updates via reviewable PRs
- ✅ **Vercel-ready** - Works out of the box
- ✅ **CI/CD friendly** - Smart detection of environments

---

**Status**: 🟢 Active and Automated  
**Next Action**: Push to GitHub and enable Actions  
**Maintenance**: None required (self-maintaining)