# AdMob Re-integration Guide

This guide explains how to re-enable AdMob ads after your app is approved on Google Play Store and you receive your AdMob ad unit IDs.

## Step 1: Get Your AdMob Ad Unit IDs

1. **Create/Login to AdMob Account**
   - Go to [AdMob Console](https://apps.admob.com/)
   - Create a new account or login

2. **Add Your App**
   - Click "Apps" → "Add App"
   - Select "Android"
   - Enter your app details
   - Submit for review

3. **Create Ad Units**
   Create the following ad units:
   - **Banner Ad**: For persistent bottom banner
   - **Interstitial Ad**: For "Load More" actions
   - **Rewarded Interstitial Ad**: For search and unlock features

4. **Copy Ad Unit IDs**
   - Each ad unit will have a unique ID like: `ca-app-pub-XXXXXXXXXX/YYYYYYYYYY`
   - Save these IDs, you'll need them next

## Step 2: Update Ad Unit IDs

Edit `src/services/admob.ts`:

```typescript
// Replace test IDs with your real AdMob ad unit IDs
const AD_UNITS = {
  banner: 'ca-app-pub-YOUR_PUBLISHER_ID/YOUR_BANNER_ID',
  interstitial: 'ca-app-pub-YOUR_PUBLISHER_ID/YOUR_INTERSTITIAL_ID',
  rewardedInterstitial: 'ca-app-pub-YOUR_PUBLISHER_ID/YOUR_REWARDED_ID',
};
```

## Step 3: Uncomment AdMob Service Methods

In `src/services/admob.ts`, find and uncomment all the service methods:

### Uncomment initialize():
```typescript
async initialize() {
  try {
    await AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: false, // Set to false for production
    });
    console.log('AdMob initialized successfully');
  } catch (error) {
    console.error('AdMob initialization failed:', error);
    throw error;
  }
}
```

### Uncomment other methods:
- `showBanner()`
- `hideBanner()`
- `showInterstitial()`
- `showRewardedInterstitial()`
- `removeBanner()`

Remove the commented placeholder returns and restore the original functionality.

## Step 4: Re-enable Ad-Related Toasts

### In `src/pages/Home.tsx`:

#### handleLoadMore function:
```typescript
const handleLoadMore = async () => {
  const loadingToast = toast({
    title: "Loading ad...",
    duration: 2000,
  });

  try {
    const result = await adMobService.showInterstitial();
    if (result) {
      setDisplayedCount(prev => Math.min(prev + TEMPLATES_PER_PAGE, allTemplates.length));
    }
  } catch (error: any) {
    console.error('Error showing ad:', error);
    toast({
      title: "Ad failed to load",
      description: error?.message || "Continuing without ad.",
      variant: "destructive",
      duration: 3000,
    });
    setDisplayedCount(prev => Math.min(prev + TEMPLATES_PER_PAGE, allTemplates.length));
  }
};
```

#### handleSearch function:
```typescript
const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    const loadingToast = toast({
      title: "Loading ad...",
      duration: 2000,
    });

    try {
      const result = await adMobService.showRewardedInterstitial();
      if (result) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    } catch (error: any) {
      console.error('Error showing rewarded ad:', error);
      toast({
        title: "Ad failed to load",
        description: error?.message || "Continuing to search...",
        variant: "destructive",
        duration: 3000,
      });
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }
};
```

### In `src/pages/Search.tsx`:

Apply the same changes to `handleSearch` and `handleLoadMore` functions.

### In `src/pages/TemplateDetail.tsx`:

#### handleUnlockButton function:
```typescript
const handleUnlockButton = async () => {
  try {
    toast({
      title: "Loading ad...",
      duration: 2000,
    });
    const result = await adMobService.showRewardedInterstitial();
    
    if (result) {
      setIsButtonUnlocked(true);
      toast({
        title: "Button unlocked!",
        description: "You can now use the template.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Ad failed to load",
        description: "Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  } catch (error) {
    console.error('Error showing rewarded ad:', error);
    toast({
      title: "Could not load ad",
      description: "Please try again.",
      variant: "destructive",
      duration: 3000,
    });
  }
};
```

#### handleLoadMoreRelated function:
```typescript
const handleLoadMoreRelated = async () => {
  try {
    toast({
      title: "Loading ad...",
      duration: 2000,
    });
    await adMobService.showInterstitial();
    setDisplayedRelatedCount(prev => Math.min(prev + RELATED_PER_PAGE, relatedTemplates.length));
  } catch (error) {
    console.error('Error showing ad:', error);
    toast({
      title: "Could not load ad",
      description: "Please try again.",
      variant: "destructive",
      duration: 3000,
    });
    setDisplayedRelatedCount(prev => Math.min(prev + RELATED_PER_PAGE, relatedTemplates.length));
  }
};
```

#### Update button text:
```typescript
<Button
  size="lg"
  onClick={handleUnlockButton}
  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
>
  <Play className="w-5 h-5 mr-2" />
  Watch an Ad to Unlock the Button
</Button>
```

## Step 5: Re-add "AD" Badges

### In `src/pages/Home.tsx`:

Add to Search button:
```typescript
<Button type="submit" size="lg" variant="secondary" className="h-12">
  <Badge variant="secondary" className="mr-2 text-xs">AD</Badge>
  Search
</Button>
```

Add to Load More button:
```typescript
<Button
  onClick={handleLoadMore}
  size="lg"
  className="bg-gradient-primary hover:opacity-90 transition-opacity hover-scale"
>
  <Badge variant="secondary" className="mr-2 text-xs">AD</Badge>
  Load More Templates
</Button>
```

### In `src/pages/Search.tsx`:

Apply the same Badge additions to Search and Load More buttons.

### In `src/pages/TemplateDetail.tsx`:

Add to Load More button:
```typescript
<Button
  onClick={handleLoadMoreRelated}
  size="lg"
  className="bg-gradient-primary hover:opacity-90 transition-opacity"
>
  <Badge variant="secondary" className="mr-2 text-xs">AD</Badge>
  Load More Templates
</Button>
```

Don't forget to import Badge:
```typescript
import { Badge } from "@/components/ui/badge";
```

## Step 6: Update App Version

Update version in `package.json`:
```json
{
  "version": "1.1.0"
}
```

Update version in `capacitor.config.ts`:
```typescript
{
  appId: 'com.yourcompany.capcuttemplatefinder',
  appName: 'CapCut Template Finder',
  version: '1.1.0',
  versionCode: 2
}
```

## Step 7: Build and Test

1. **Build the app**:
   ```bash
   npm run build
   npx cap sync
   npx cap open android
   ```

2. **Test ads on real device**:
   - Build a debug APK
   - Install on a real Android device
   - Test all ad placements
   - Verify ads load correctly

3. **Important Testing Notes**:
   - Ads may take 24-48 hours to start serving after AdMob approval
   - Use test ads first by keeping `initializeForTesting: true`
   - Once tested, set `initializeForTesting: false` for production

## Step 8: Build Release Version

Follow the steps in `GOOGLE_PLAY_PUBLISHING_GUIDE.md` to:
1. Build release AAB
2. Sign the app
3. Upload to Play Console as an update
4. Submit for review

## Step 9: Monitor Ad Performance

After publishing:
1. Monitor ad performance in AdMob Console
2. Check revenue reports
3. Adjust ad placements if needed
4. Monitor user feedback about ad frequency

## Troubleshooting

### Ads Not Showing
- Verify Ad Unit IDs are correct
- Check AdMob account status
- Ensure app is published on Play Store
- Wait 24-48 hours for ads to start serving
- Check device ad settings (not in test mode)

### Ad Loading Errors
- Check console logs for specific errors
- Verify internet connection
- Check AdMob dashboard for issues
- Ensure AdMob account is in good standing

### Low Fill Rate
- AdMob needs time to optimize
- May take a few days to improve
- Check target audience settings
- Consider enabling more ad networks

## Best Practices

1. **Don't Overdo Ads**: Balance user experience with monetization
2. **Provide Value**: Ensure ads don't disrupt core functionality
3. **Test Thoroughly**: Always test on real devices before releasing
4. **Monitor Performance**: Keep an eye on metrics and user feedback
5. **Stay Compliant**: Follow AdMob policies and Play Store guidelines

## Need Help?

- [AdMob Help Center](https://support.google.com/admob)
- [AdMob Community](https://groups.google.com/g/google-admob-ads-sdk)
- [Capacitor AdMob Plugin Docs](https://github.com/capacitor-community/admob)

## Version Update Checklist

- [ ] Updated Ad Unit IDs in admob.ts
- [ ] Uncommented all AdMob service methods
- [ ] Re-enabled toast notifications
- [ ] Re-added "AD" badges to buttons
- [ ] Updated "Watch an Ad to Unlock" text
- [ ] Updated app version numbers
- [ ] Built and tested on real device
- [ ] Created release build
- [ ] Uploaded to Play Console
- [ ] Submitted for review
