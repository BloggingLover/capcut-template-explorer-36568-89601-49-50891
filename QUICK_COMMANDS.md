# Quick Command Reference

## 🚀 Complete Build & Publish Commands

### Initial Setup (One Time)
```bash
# 1. Export from Lovable to GitHub (use UI button)

# 2. Clone repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# 3. Install dependencies
npm install

# 4. Add Android platform
npx cap add android
```

---

## 📦 Building for Production

### Every Time You Want to Build:
```bash
# 1. Pull latest changes
git pull

# 2. Install/update dependencies (if package.json changed)
npm install

# 3. Build the web app
npm run build

# 4. Sync with Android
npx cap sync android

# 5. Open in Android Studio
npx cap open android
```

### In Android Studio:
1. `Build → Generate Signed Bundle/APK`
2. Select `Android App Bundle (.aab)`
3. Choose your keystore
4. Select `release` variant
5. Wait for build (AAB will be in `android/app/release/`)

---

## 🔄 After Making Code Changes

```bash
# Save changes to git
git add .
git commit -m "Your change description"
git push

# Rebuild app
npm run build
npx cap sync android

# Open Android Studio and generate new AAB
npx cap open android
```

---

## 📱 Testing on Device/Emulator

### Run on Connected Device:
```bash
npx cap run android
```

### Run on Specific Device:
```bash
# List devices
adb devices

# Run on specific device
npx cap run android --target=DEVICE_ID
```

---

## 🐛 Troubleshooting Commands

### Clear Cache and Rebuild:
```bash
# Clear node modules
rm -rf node_modules
npm install

# Clear build
rm -rf dist
npm run build

# Clean Android
cd android
./gradlew clean
cd ..

# Sync again
npx cap sync android
```

### Fix Gradle Issues:
```bash
cd android
./gradlew clean build --refresh-dependencies
cd ..
```

### Check Capacitor Status:
```bash
npx cap doctor
```

---

## 📊 Version Management

### Update Version Before New Release:

Edit `android/app/build.gradle`:
```gradle
defaultConfig {
    versionCode 2        // Increment by 1 each release
    versionName "1.1.0"  // Update version string
}
```

### Version Naming Convention:
- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes (1.0.0 → 2.0.0)
- **Minor**: New features (1.0.0 → 1.1.0)
- **Patch**: Bug fixes (1.0.0 → 1.0.1)

Examples:
- Initial release: `1.0.0`
- Adding AdMob: `1.1.0`
- Bug fix: `1.1.1`
- New features: `1.2.0`

---

## 🔐 Keystore Management

### Generate New Keystore (First Time):
```bash
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### View Keystore Info:
```bash
keytool -list -v -keystore /path/to/keystore.jks
```

### Backup Keystore (CRITICAL):
```bash
# Copy to multiple safe locations:
# 1. External hard drive
# 2. Cloud storage (encrypted)
# 3. Password manager vault
cp my-release-key.keystore ~/Backup/
```

---

## 📤 Play Store Upload Checklist

Before each upload:
- [ ] Updated versionCode in build.gradle
- [ ] Updated versionName in build.gradle
- [ ] Tested on real device
- [ ] No console errors
- [ ] All features working
- [ ] Generated signed AAB
- [ ] Written release notes

---

## 🔄 Phase 2: Adding AdMob

### After App is Published:

1. **Update Code** - Edit `src/services/admob.ts`:
```typescript
// 1. Replace test Ad Unit IDs with your real IDs
const AD_UNITS = {
  banner: 'ca-app-pub-XXXXX/XXXXX',
  interstitial: 'ca-app-pub-XXXXX/XXXXX',
  rewardedInterstitial: 'ca-app-pub-XXXXX/XXXXX',
};

// 2. Uncomment all methods (remove /* */ comments)

// 3. Set testing to false
initializeForTesting: false
```

2. **Update AndroidManifest.xml**:
```xml
<application>
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-XXXXX~XXXXX"/>
</application>
```

3. **Rebuild**:
```bash
git add .
git commit -m "Add AdMob integration"
git push

npm run build
npx cap sync android
npx cap open android
```

4. **Update Play Store**:
- Increment versionCode to 2
- Update versionName to "1.1.0"
- Generate new signed AAB
- Upload as update in Play Console
- Change "Contains Ads" to "Yes"

---

## 💡 Useful Git Commands

### Check Status:
```bash
git status
```

### Pull Latest Changes:
```bash
git pull
```

### Push Your Changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

### View Commit History:
```bash
git log --oneline
```

### Undo Last Commit (before push):
```bash
git reset --soft HEAD~1
```

---

## 🎯 Development Workflow

### Recommended Flow:

**Development:**
```bash
# Work on lovable.dev
# Test in web preview
# Export to GitHub when ready
```

**Building:**
```bash
git pull
npm install
npm run build
npx cap sync android
npx cap open android
# Generate AAB in Android Studio
```

**Testing:**
```bash
# Internal testing first
# Upload to Play Console → Internal Testing
# Test with real users
# Then promote to production
```

**Updating:**
```bash
# Make changes on lovable.dev
# Export to GitHub
git pull
# Increment version
npm run build
npx cap sync android
# Generate new AAB
# Upload as update
```

---

## 📱 Device Testing Commands

### Enable Developer Mode on Android:
1. Settings → About Phone
2. Tap "Build Number" 7 times
3. Settings → Developer Options → USB Debugging ON

### Connect and Test:
```bash
# Check connection
adb devices

# View logs
adb logcat

# Run app
npx cap run android

# View app logs only
adb logcat | grep "Capacitor"
```

---

## 🚨 Emergency Commands

### If Build Fails:
```bash
# Nuclear option - clean everything
rm -rf node_modules
rm -rf dist
rm -rf android/app/build
npm install
npm run build
npx cap sync android
```

### If Android Studio Issues:
```bash
# Invalidate caches
# In Android Studio: File → Invalidate Caches → Invalidate and Restart
```

### If Capacitor Sync Issues:
```bash
npx cap sync android --force
```

---

## 📚 Important File Locations

### Configuration Files:
- `capacitor.config.ts` - Capacitor settings
- `android/app/build.gradle` - Version, package name
- `android/app/src/main/AndroidManifest.xml` - Permissions, AdMob ID

### Generated AAB Location:
```
android/app/release/app-release.aab
```

### Keystore Location:
```
# Wherever you saved it during generation
# NEVER commit to git!
# Add to .gitignore
```

---

## 🔗 Quick Links

- [Play Console](https://play.google.com/console)
- [AdMob Console](https://admob.google.com/)
- [Capacitor Docs](https://capacitorjs.com/)
- [Android Developer](https://developer.android.com/)

---

## 💾 Save These Commands

Copy this file to your project root and refer to it whenever you need to build or update your app!

```bash
# Quick command to rebuild and open Android Studio:
npm run build && npx cap sync android && npx cap open android
```

---

Good luck! 🚀
