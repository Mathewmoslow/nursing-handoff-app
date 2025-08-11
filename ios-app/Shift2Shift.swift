import SwiftUI

@main
struct NursingHandoffApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onReceive(NotificationCenter.default.publisher(for: UIApplication.willResignActiveNotification)) { _ in
                    // App going to background - could clear sensitive data
                    print("App going to background")
                }
                .onReceive(NotificationCenter.default.publisher(for: UIApplication.willEnterForegroundNotification)) { _ in
                    // App coming to foreground - re-authenticate
                    print("App coming to foreground")
                }
        }
    }
}

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        // Configure app settings
        configureApp()
        return true
    }
    
    func configureApp() {
        // Set idle timer to prevent screen lock during patient care
        UIApplication.shared.isIdleTimerDisabled = false // Set to true if you want to prevent auto-lock
        
        // Configure cache for offline mode
        URLCache.shared = URLCache(
            memoryCapacity: 10 * 1024 * 1024, // 10 MB
            diskCapacity: 50 * 1024 * 1024,   // 50 MB
            diskPath: nil
        )
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
        // Optional: Clear sensitive data from memory
        // This is called when app goes to background
    }
    
    func applicationWillTerminate(_ application: UIApplication) {
        // Clear any cached sensitive data
        URLCache.shared.removeAllCachedResponses()
    }
}