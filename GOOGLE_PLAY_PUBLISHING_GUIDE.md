# Complete Guide: Publishing to Google Play Store

## 📱 Overview
This guide will walk you through publishing your CapCut Template Explorer app to Google Play Store in two phases:
1. **Phase 1**: Initial release WITHOUT ads (AdMob requires a published app)
2. **Phase 2**: Update with AdMob integration after approval

---

## 🎯 Phase 1: Initial Release (Current State)

### Prerequisites
- ✅ Google Play Console account ($25 one-time registration fee)
- ✅ Valid credit/debit card for registration
- ✅ App content prepared (description, screenshots, icons)

---

## 🖼️ Step 1: Prepare App Assets

### App Icon Requirements
Create icons in these sizes:
- **512x512 px** - High-res icon for Play Store listing
- **192x192 px** - Launcher icon (xxxhdpi)
- **144x144 px** - Launcher icon (xxhdpi)
- **96x96 px** - Launcher icon (xhdpi)
- **72x72 px** - Launcher icon (hdpi)
- **48x48 px** - Launcher icon (mdpi)

**Design Tips:**
- Use simple, recognizable design
- Avoid text if possible (icons should work at small sizes)
- Use CapCut's purple theme (#8B5CF6) for brand consistency
- Recommended: Video/template icon with purple gradient

**Icon placement:**
```
android/app/src/main/res/
  ├── mipmap-mdpi/ic_launcher.png (48x48)
  ├── mipmap-hdpi/ic_launcher.png (72x72)
  ├── mipmap-xhdpi/ic_launcher.png (96x96)
  ├── mipmap-xxhdpi/ic_launcher.png (144x144)
  └── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

### Feature Graphic
- **Size**: 1024x500 px
- **Format**: PNG or JPEG (no transparency)
- **Content**: Your app branding, hero image showing the app UI

### Screenshots (Required minimum 2, maximum 8)
- **Phone**: 1080x1920 px (portrait) or 1920x1080 px (landscape)
- **7-inch Tablet** (optional): 1536x2048 px
- **10-inch Tablet** (optional): 2048x1536 px

**Screenshot Tips:**
- Show key features: template browsing, search, categories
- Use actual app screenshots (you can add promotional text overlay)
- Show the app in action with real content

---

## 📝 Step 2: Prepare Store Listing Content

### App Title (max 50 characters)
```
CapCut Template Explorer
```

### Short Description (max 80 characters)
```
Discover trending CapCut templates. Browse, search & create stunning videos!
```

### Full Description (max 4000 characters)
```
🎬 CapCut Template Explorer - Your Ultimate Template Discovery App

Discover thousands of trending CapCut video templates in one place! Whether you're creating content for TikTok, Instagram Reels, or YouTube Shorts, find the perfect template for your videos.

✨ KEY FEATURES:

📱 Browse by Category
• Explore templates organized by popular categories
• Love & Romance, Travel & Adventure, Food & Lifestyle
• Business & Professional, Comedy & Memes, and more!

🔍 Smart Search
• Find templates with powerful search
• Filter by duration, clips, aspect ratio
• Sort by popularity and newest additions

💡 Template Details
• View full template previews
• See usage stats and requirements
• Check number of clips and duration
• Direct links to use in CapCut app

🎨 Beautiful Interface
• Modern, clean design
• Dark mode support
• Smooth animations and transitions
• Optimized for all screen sizes

⚡ Fast & Reliable
• Quick loading with smart caching
• Pull-to-refresh for latest templates
• Lazy loading for optimal performance

🌟 PERFECT FOR:
• Content creators on TikTok, Instagram, YouTube
• Video editors looking for trending templates
• Businesses creating social media content
• Anyone wanting to make professional-looking videos

🎯 WHY CHOOSE THIS APP?
Unlike browsing templates within the CapCut app, our dedicated explorer gives you:
- Better organization and filtering
- Faster browsing experience
- Advanced search capabilities
- Bookmark favorite templates

📲 HOW IT WORKS:
1. Browse or search for templates
2. Preview the template
3. Tap to open directly in CapCut app
4. Create amazing videos!

🔄 ALWAYS UPDATED:
We continuously sync with the latest CapCut templates, so you'll always have access to trending and new templates as soon as they're available.

⭐ FREE TO USE:
Download and explore thousands of templates completely free!

---

DISCLAIMER: This is an unofficial third-party app. CapCut is a trademark of Bytedance Pte. Ltd. This app helps users discover templates available on the CapCut platform.

---

Need help? Contact us at: your-email@example.com
```

### Category
Select: **Video Players & Editors**

### Tags (up to 5)
```
- video templates
- capcut
- video editor
- template finder
- video editing
```

### Contact Details
- Email address (required)
- Website (optional but recommended)
- Phone number (optional)

---

## 🏗️ Step 3: Build the Production App

### 1. Update App Version
Edit `capacitor.config.ts`:
```typescript
const config: CapacitorConfig = {
  appId: 'app.lovable.6be872e2eea847c59592a15bdaa575b7',
  appName: 'CapCut Template Explorer',
  webDir: 'dist',
  // Remove the server URL for production build
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#8B5CF6",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};
```

### 2. Build Commands
```bash
# 1. Export project to GitHub
# (Use the "Export to GitHub" button in Lovable)

# 2. Clone to your local machine
git clone your-repo-url
cd your-project

# 3. Install dependencies
npm install

# 4. Build the web app
npm run build

# 5. Sync with Android
npx cap sync android

# 6. Open in Android Studio
npx cap open android
```

### 3. Configure Build in Android Studio

#### Update `build.gradle` (app level)
```gradle
android {
    namespace "app.lovable.6be872e2eea847c59592a15bdaa575b7"
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "app.lovable.6be872e2eea847c59592a15bdaa575b7"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1        // Increment for each release
        versionName "1.0.0"  // User-facing version
    }
    
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

## 🔐 Step 4: Generate Signed APK/AAB

### 1. Create Keystore (First time only)
In Android Studio:
```
Build → Generate Signed Bundle/APK → Create new keystore
```

**Important**: Save these details securely!
- Keystore path
- Keystore password
- Key alias
- Key password

⚠️ **CRITICAL**: Never lose this keystore! You cannot update your app without it.

### 2. Generate Release Build
```
Build → Generate Signed Bundle/APK
→ Select "Android App Bundle" (AAB)
→ Choose your keystore
→ Select "release" build variant
→ Click Finish
```

**Why AAB?**: Google Play requires Android App Bundle format for optimal app delivery.

---

## 🚀 Step 5: Upload to Google Play Console

### 1. Create App
1. Go to [Google Play Console](https://play.google.com/console)
2. Click "Create app"
3. Fill in basic details:
   - App name: CapCut Template Explorer
   - Default language: English (US)
   - App type: App
   - Free or Paid: Free

### 2. Complete Store Listing
Navigate to **Store Presence → Main Store Listing**:
- Upload app icon (512x512)
- Add feature graphic (1024x500)
- Upload screenshots (minimum 2)
- Enter app description
- Select category and tags

### 3. Content Rating
Navigate to **Policy → App Content → Content Rating**:
1. Start questionnaire
2. Select category: Utilities
3. Answer questions honestly
4. Submit for rating

### 4. Target Audience
Navigate to **Policy → App Content → Target Audience**:
- Select appropriate age groups (probably 13+)
- Indicate if app has ads (No for Phase 1)

### 5. Privacy Policy
⚠️ **Required for apps on Play Store**

Create a simple privacy policy or use a generator:
- [Privacy Policy Generator](https://www.privacypolicygenerator.info/)
- Host on your website or GitHub Pages
- Add URL to Play Console: **Policy → App Content → Privacy Policy**

**Minimal Privacy Policy** (if app doesn't collect data):
```markdown
# Privacy Policy for CapCut Template Explorer

Last updated: [Date]

## Information Collection
This app does not collect, store, or share any personal information.

## Third-Party Services
This app uses:
- CapCut API for template data
- No user tracking or analytics

## Changes to Policy
We may update this policy. Changes will be posted on this page.

## Contact
For questions: your-email@example.com
```

### 6. Set Up Pricing & Distribution
Navigate to **Release → Production → Countries/Regions**:
- Select countries (or "Add all countries")
- Confirm app is free
- Accept terms and conditions

---

## 📤 Step 6: Create Production Release

### 1. Internal Testing (Recommended First)
1. Navigate to **Release → Testing → Internal Testing**
2. Click "Create new release"
3. Upload your AAB file
4. Add release notes:
```
Initial release of CapCut Template Explorer
- Browse templates by category
- Search and filter templates
- View template details
- Direct links to CapCut app
```
5. Review and rollout

**Internal Testing Benefits:**
- Test on real devices before public release
- Identify issues early
- Get feedback from testers

### 2. Production Release
Once internal testing is successful:

1. Navigate to **Release → Production**
2. Click "Create new release"
3. Upload your AAB file
4. Add release notes (same as above)
5. Review checklist
6. Click "Start rollout to Production"

---

## ⏱️ Step 7: Wait for Review

### Review Timeline
- **Initial review**: 1-3 days (can take up to 7 days)
- **Updates**: Usually 24-48 hours

### Review Status
Monitor in Play Console:
- **Under review**: Google is reviewing
- **Approved**: App is live!
- **Rejected**: Review rejection reasons (fix and resubmit)

### Common Rejection Reasons
- Missing privacy policy
- Copyright issues (using CapCut brand inappropriately)
- Incomplete store listing
- App crashes on launch

---

## 🎊 Step 8: App is Live!

Once approved:
1. Share your Play Store link: 
   ```
   https://play.google.com/store/apps/details?id=app.lovable.6be872e2eea847c59592a15bdaa575b7
   ```
2. Promote on social media
3. Get user feedback

---

## 📈 Phase 2: Adding AdMob (After Initial Release)

### Why Wait for Phase 2?
AdMob requires:
- ✅ App published on Play Store
- ✅ App actively used by real users
- ✅ Content policy compliance verified

### Steps for Phase 2 (After App Approval):

#### 1. Set Up AdMob Account
1. Go to [AdMob](https://admob.google.com/)
2. Sign in with Google account
3. Click "Get Started"
4. Add your app:
   - Select platform: Android
   - Search for your published app
   - Link it to AdMob

#### 2. Create Ad Units
In AdMob dashboard:

**Banner Ad:**
- Format: Banner
- Name: "Home Banner"
- Copy Ad Unit ID

**Interstitial Ad:**
- Format: Interstitial
- Name: "Load More"
- Copy Ad Unit ID

**Rewarded Interstitial:**
- Format: Rewarded Interstitial
- Name: "Unlock Button"
- Copy Ad Unit ID

#### 3. Update Code
Edit `src/services/admob.ts`:

```typescript
// Replace test IDs with your real Ad Unit IDs
const AD_UNITS = {
  banner: 'ca-app-pub-XXXXX/XXXXX',  // Your real ID
  interstitial: 'ca-app-pub-XXXXX/XXXXX',  // Your real ID
  rewardedInterstitial: 'ca-app-pub-XXXXX/XXXXX',  // Your real ID
};

// Uncomment all the commented code
// Remove the console.log statements
// Set initializeForTesting: false
```

#### 4. Add AdMob App ID to AndroidManifest.xml
```xml
<manifest>
    <application>
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-XXXXX~XXXXX"/>
    </application>
</manifest>
```

#### 5. Build and Upload Update
```bash
# Update version in build.gradle
versionCode 2
versionName "1.1.0"

# Build
npm run build
npx cap sync android

# Generate new signed AAB in Android Studio

# Upload to Play Console as update
```

#### 6. Update Store Listing
- Update description mentioning ad-supported
- Change "Contains Ads" setting to "Yes"
- Submit for review

---

## 🔄 Version Updates Process

For future updates:

### 1. Make Changes
```bash
git pull  # Get latest code
# Make your changes
git add .
git commit -m "Update description"
git push
```

### 2. Increment Version
In `android/app/build.gradle`:
```gradle
versionCode 2        // Always increment by 1
versionName "1.1.0"  // Follow semantic versioning
```

### 3. Build & Upload
```bash
npm run build
npx cap sync android
# Generate signed AAB
# Upload to Play Console → Production → Create new release
```

---

## 📊 Monitoring & Analytics

### Play Console Analytics
Monitor in Play Console:
- **Statistics**: Downloads, ratings, crashes
- **User Feedback**: Reviews and ratings
- **Crashes**: ANR (App Not Responding) reports
- **Pre-launch Reports**: Automated testing results

### Response to Reviews
- Respond to user reviews promptly
- Address bugs and feature requests
- Maintain good rating (4.0+ stars)

---

## ⚠️ Important Reminders

### DO:
- ✅ Keep keystore file safe (backup in multiple locations)
- ✅ Test thoroughly before each release
- ✅ Monitor reviews and respond professionally
- ✅ Update app regularly
- ✅ Follow Google Play policies
- ✅ Keep privacy policy updated

### DON'T:
- ❌ Click your own ads (will get AdMob account banned)
- ❌ Encourage users to click ads
- ❌ Use misleading descriptions
- ❌ Copy other apps' assets
- ❌ Violate CapCut's trademark
- ❌ Lose your keystore file

---

## 🆘 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew build
```

### Signing Issues
- Verify keystore path is correct
- Check passwords match
- Ensure key alias is correct

### Upload Issues
- Ensure version code is higher than previous
- AAB file must be under 150MB
- Check for policy violations

---

## 📚 Helpful Resources

- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
- [Android Developer Documentation](https://developer.android.com/)
- [Capacitor Documentation](https://capacitorjs.com/)
- [AdMob Help Center](https://support.google.com/admob/)

---

## 🎯 Checklist: Before First Submission

- [ ] All icons created and added
- [ ] Feature graphic designed (1024x500)
- [ ] At least 2 screenshots taken
- [ ] App description written
- [ ] Privacy policy created and hosted
- [ ] Content rating questionnaire completed
- [ ] Target audience set
- [ ] Pricing and distribution configured
- [ ] Signed AAB generated
- [ ] Store listing reviewed
- [ ] Tested on real Android device
- [ ] Version code and name set correctly

---

## 📧 Support

If you need help during the process:
- Check Google Play Console Help Center
- Review Android Developer documentation
- Post in Capacitor community forum

Good luck with your app launch! 🚀
