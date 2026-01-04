# 🔕 GitHub Notification Management Guide

## Stop the Email Flood - Quick Actions

### 🚨 Immediate Relief (Stop Current Emails)

#### Option 1: Unsubscribe from Specific Threads
Each email has an "unsubscribe" link at the bottom. Click it to stop that specific thread.

#### Option 2: Mute Pull Requests
1. Go to each PR on GitHub
2. Click **Notifications** (bell icon) on the right
3. Click **Unsubscribe**

#### Option 3: Adjust Repository Watch Settings
1. Go to your repository
2. Click **Watch** dropdown (top right)
3. Select **Participating and @mentions** (instead of "All Activity")

---

## 🎯 Recommended Settings for This Project

### For Less Noise, Better Signal:

#### 1. Repository Watch Settings
```
Watch: Participating and @mentions
```
This means you'll only get notified when:
- Someone mentions you
- You're assigned to something
- You participate in a discussion

#### 2. GitHub Email Notification Settings

Go to: https://github.com/settings/notifications

**Recommended:**
- ✅ Participating: Email
- ✅ @mentions: Email
- ❌ Watching: Off (or Web only)
- ❌ All: Off

**Dependabot:**
- ✅ Security alerts: Email (important!)
- ⚠️ New dependencies: Web only (not Email)
- ⚠️ Updates: Web only (not Email)

**GitHub Actions:**
- ✅ Failed workflows: Email
- ⚠️ All workflows: Web only

---

## 📧 My Recommended Setup

### What I'd Do:

```
Repository Watch:     Participating and @mentions
Email Notifications:  Failures and mentions only
Dependabot:          Security alerts only (email)
GitHub Actions:      Failed runs only (email)
Pull Requests:       Participating only
```

This way you get:
- ✅ Security alerts (important!)
- ✅ Failed builds (need to fix)
- ✅ Direct mentions
- ❌ Every PR update
- ❌ Every Dependabot check
- ❌ Every successful build

---

## 🛠️ Step-by-Step: Reduce Notifications

### Step 1: Repository Level
1. Go to: https://github.com/DebdootManna/browser-whisperer-reveal
2. Click **Watch** dropdown (top right)
3. Select **Custom**
4. Configure:
   - ✅ Issues
   - ✅ Pull requests (only if you're participating)
   - ✅ Releases
   - ✅ Discussions
   - ✅ Security alerts
   - ❌ Actions (unless you want all of them)

### Step 2: Global Settings
1. Go to: https://github.com/settings/notifications
2. **Email notification preferences:**
   - Watching: Uncheck or set to Web
   - Participating: Keep checked
   - @mentions: Keep checked

3. **Dependabot alerts:**
   - New vulnerabilities: Email
   - All others: Web only

4. **Actions:**
   - Only notify on failure
   - Or Web only

### Step 3: Current PRs
For the existing Dependabot PRs:
1. Go to each PR
2. Click **Unsubscribe** (bell icon on right)
3. Or just close them

---

## 🎛️ Dependabot Configuration Options

You can also adjust Dependabot frequency in `.github/dependabot.yml`:

### Current Setup (Weekly):
```yaml
schedule:
  interval: "weekly"
  day: "monday"
```

### Change to Monthly (Less Frequent):
```yaml
schedule:
  interval: "monthly"
  day: "monday"
```

### Change to Daily (More Frequent, More Emails):
```yaml
schedule:
  interval: "daily"
  time: "03:00"
```

### Reduce Open PRs Limit:
```yaml
open-pull-requests-limit: 3  # Default is 5, reduce to 3 or even 1
```

---

## 🎯 My Recommendation for Your Project

### Edit `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "monthly"  # Changed from weekly
      day: "monday"
    open-pull-requests-limit: 3  # Reduced from 5
    labels:
      - "dependencies"
    commit-message:
      prefix: "chore"
      include: "scope"
    groups:
      development-dependencies:
        dependency-type: "development"
        update-types: ["minor", "patch"]
      production-dependencies:
        dependency-type: "production"
        update-types: ["patch"]
```

This reduces:
- Weekly → Monthly checks
- 5 → 3 max open PRs
- Groups updates to reduce PR count

---

## ✅ What to Do Right Now

### Immediate (5 minutes):
1. **Close Dependabot PRs** on GitHub (they have label errors anyway)
2. **Push the fixes** I made to workflow and dependabot config:
   ```bash
   ./QUICK_FIX_COMMANDS.sh
   ```
3. **Adjust watch settings**:
   - Go to repo → Watch → Participating and @mentions

### Short Term (10 minutes):
1. **GitHub notification settings**:
   - https://github.com/settings/notifications
   - Set Dependabot to Web only (except security)
   - Set Actions to failures only
2. **Consider monthly Dependabot** instead of weekly

### Long Term:
- Review Dependabot PRs once a month
- Merge them in batches
- Keep security alerts on email
- Enjoy peaceful inbox ☺️

---

## 📊 Expected Email Volume After Adjustments

### Before (Current): 😱
- 10-20 emails/week from Dependabot
- 5-10 emails/week from Actions
- Every PR update
- Every commit notification

### After (Recommended): 😊
- 0-3 emails/month from Dependabot (security only)
- 0-2 emails/month from Actions (failures only)
- Only @mentions and participation
- Peaceful inbox!

---

## 🆘 Emergency: Stop Everything

If you want to pause all automation:

1. **Disable GitHub Actions:**
   - Settings → Actions → Disable actions

2. **Disable Dependabot:**
   - Settings → Code security → Disable Dependabot alerts

3. **Unwatch Repository:**
   - Watch dropdown → Ignore

Then re-enable when you've adjusted settings.

---

## 📝 Summary

**Problem:** Email bombardment from Dependabot and Actions  
**Cause:** First-time activation + label errors  
**Solution:** 
1. Fix the configs (I've done this)
2. Adjust notification settings (your choice)
3. Consider monthly instead of weekly checks

**Recommended settings:**
- Repository: Participating and @mentions
- Dependabot: Security only (email), rest web
- Actions: Failures only
- Monthly schedule instead of weekly

---

**Links:**
- Notification settings: https://github.com/settings/notifications
- This repository: https://github.com/DebdootManna/browser-whisperer-reveal
- GitHub docs: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github
