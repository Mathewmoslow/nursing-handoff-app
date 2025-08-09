# iOS App Setup Instructions

## Prerequisites
- Xcode 14.0 or later
- iOS 15.0+ deployment target
- Apple Developer Account

## Setup Steps

### 1. Create New Xcode Project
1. Open Xcode
2. File → New → Project
3. Choose "iOS" → "App"
4. Configure:
   - Product Name: `NursingHandoffSBAR`
   - Team: Select your developer team
   - Organization Identifier: `com.yourcompany`
   - Interface: SwiftUI
   - Language: Swift
   - Use Core Data: No
   - Include Tests: Yes (optional)

### 2. Add Swift Files
1. Delete the default `ContentView.swift` file
2. Right-click on your project folder → "Add Files to..."
3. Add these files from the `ios-app` folder:
   - `ContentView.swift`
   - `NursingHandoffApp.swift`

### 3. Configure Info.plist
1. Right-click on Info.plist → "Open As" → "Source Code"
2. Replace with contents from `ios-app/Info.plist`
3. Or manually add:
   - `NSFaceIDUsageDescription`: "Use Face ID to securely access patient information"

### 4. Update WebView URL
1. Open `ContentView.swift`
2. Find line ~97: `let url = URL(string: "https://nursing-handoff-sbar.vercel.app")!`
3. Replace with your Vercel URL after deployment

### 5. Configure Capabilities
1. Select your project in navigator
2. Select your target
3. Go to "Signing & Capabilities"
4. Add capabilities:
   - Background Modes (check "Background fetch")
   - Face ID (automatically added with Info.plist)

### 6. Build Settings
1. Minimum iOS Deployment Target: 15.0
2. Supported Destinations: iPhone, iPad
3. Device Orientations: All

### 7. App Icons and Launch Screen
1. Add app icons in Assets.xcassets
2. Configure launch screen (optional)

## Testing

### Local Testing
1. Change URL in `ContentView.swift` to: `http://localhost:3000`
2. Run `npm start` in your React project
3. Build and run iOS app in Simulator

### Production Testing
1. Ensure Vercel URL is set correctly
2. Build to physical device for Face ID testing

## Deployment to App Store

### 1. Configure App Store Connect
1. Create new app in App Store Connect
2. Fill in app information
3. Add screenshots (required sizes)
4. Set privacy policy URL
5. Configure TestFlight for beta testing

### 2. Archive and Upload
1. In Xcode: Product → Archive
2. Validate archive
3. Upload to App Store Connect
4. Submit for review

## HIPAA Compliance Notes

### Required for Production:
1. **Encryption**: The app uses HTTPS for all communications
2. **Authentication**: Face ID/Touch ID required
3. **Session Timeout**: Implemented in web app (15 minutes)
4. **Audit Logging**: Implemented in web app
5. **Data at Rest**: No local storage of PHI (all in web app)

### Additional Recommendations:
1. Use MDM (Mobile Device Management) for enterprise deployment
2. Implement certificate pinning for added security
3. Add remote wipe capability
4. Use encrypted Core Data if storing any data locally
5. Implement app-level PIN as fallback

## Troubleshooting

### WebView Not Loading
- Check network permissions in Info.plist
- Verify Vercel URL is correct
- Check console logs in Xcode

### Face ID Not Working
- Requires physical device (not simulator)
- Check Info.plist has usage description
- Verify device has Face ID configured

### Session Issues
- Clear Safari cache if testing with same domain
- Check localStorage permissions in WebView configuration

## Next Steps

1. **Offline Mode**: Bundle React build for offline access
2. **Push Notifications**: Add push notification support
3. **Native Features**: 
   - Camera for wound photos
   - Voice notes
   - Native share sheet
4. **Analytics**: Add privacy-compliant analytics
5. **Crash Reporting**: Integrate Crashlytics or similar