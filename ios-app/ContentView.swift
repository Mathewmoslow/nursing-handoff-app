import SwiftUI
import WebKit
import LocalAuthentication

struct ContentView: View {
    @State private var isAuthenticated = false
    @State private var showingOfflineAlert = false
    @AppStorage("lastSyncDate") private var lastSyncDate = Date()
    
    var body: some View {
        ZStack {
            if isAuthenticated {
                WebViewContainer()
                    .edgesIgnoringSafeArea(.all)
            } else {
                AuthenticationView(isAuthenticated: $isAuthenticated)
            }
        }
        .onAppear {
            authenticateUser()
        }
    }
    
    func authenticateUser() {
        let context = LAContext()
        var error: NSError?
        
        // Check if biometric authentication is available
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            let reason = "Access patient information securely"
            
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) { success, authError in
                DispatchQueue.main.async {
                    if success {
                        self.isAuthenticated = true
                    } else {
                        // Fallback to passcode
                        self.authenticateWithPasscode()
                    }
                }
            }
        } else {
            // No biometrics available, use passcode
            authenticateWithPasscode()
        }
    }
    
    func authenticateWithPasscode() {
        let context = LAContext()
        let reason = "Access patient information securely"
        
        context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, error in
            DispatchQueue.main.async {
                self.isAuthenticated = success
            }
        }
    }
}

struct AuthenticationView: View {
    @Binding var isAuthenticated: Bool
    
    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "lock.shield.fill")
                .font(.system(size: 80))
                .foregroundColor(.blue)
            
            Text("Nursing Handoff SBAR")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Authentication Required")
                .font(.headline)
                .foregroundColor(.secondary)
            
            Text("This app contains protected health information")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            
            Button(action: {
                // Trigger authentication again
                let contentView = ContentView()
                contentView.authenticateUser()
            }) {
                Label("Unlock", systemImage: "faceid")
                    .frame(width: 200, height: 50)
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
        .padding()
    }
}

struct WebViewContainer: UIViewRepresentable {
    // Change this to your Vercel URL after deployment
    let url = URL(string: "https://nursing-handoff-sbar.vercel.app")!
    // For local testing use:
    // let url = URL(string: "http://localhost:3000")!
    
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        
        // Enable localStorage and sessionStorage
        config.websiteDataStore = WKWebsiteDataStore.default()
        
        // Allow inline media playback
        config.allowsInlineMediaPlayback = true
        
        // Create WebView
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        
        // Enable zoom
        webView.scrollView.minimumZoomScale = 1.0
        webView.scrollView.maximumZoomScale = 3.0
        
        // Load the web app
        webView.load(URLRequest(url: url))
        
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        // Reload if needed
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, WKNavigationDelegate {
        var parent: WebViewContainer
        
        init(_ parent: WebViewContainer) {
            self.parent = parent
        }
        
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            // Inject JavaScript to handle offline mode
            let js = """
            if (!navigator.onLine) {
                document.body.innerHTML = '<div style="text-align: center; padding: 50px;"><h1>Offline Mode</h1><p>Please check your internet connection</p></div>';
            }
            """
            webView.evaluateJavaScript(js)
        }
        
        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            print("Navigation failed: \(error.localizedDescription)")
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}