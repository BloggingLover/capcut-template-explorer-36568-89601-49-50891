import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const PrivacyPolicyApp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground py-6 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center gap-3">
            <Smartphone className="w-8 h-8" />
            <Shield className="w-8 h-8" />
            <h1 className="text-4xl font-bold">App Privacy Policy</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="bg-card rounded-lg p-8 shadow-sm space-y-6">
          <section>
            <p className="text-sm text-muted-foreground mb-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy applies specifically to the CapCut Template Finder mobile application 
              available on Google Play Store. By using our app, you agree to the collection and use of 
              information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Our mobile application collects the following information:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Device identifiers and hardware information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Operating system version and app version</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Search queries and template preferences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>App usage statistics and interaction data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Crash reports and performance data</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Advertising</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Our app uses Google AdMob to display advertisements. AdMob may collect and use:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Device advertising ID</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>IP address and location data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>User interactions with advertisements</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You can opt out of personalized advertising by adjusting your device's ad settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Permissions</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The app may request the following permissions:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Internet Access:</strong> Required to load templates and display ads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Network State:</strong> To check connectivity and optimize loading</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">How We Use Your Information</h2>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>To provide and maintain the app functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>To personalize your template discovery experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>To display relevant advertisements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>To analyze app performance and improve user experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>To detect and prevent technical issues</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Our app uses the following third-party services:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Google AdMob:</strong> For displaying advertisements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>CapCut API:</strong> For fetching template data</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              These services have their own privacy policies. We encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Data Storage and Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard security measures to protect your information. 
              Data is stored securely and encrypted during transmission. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our app is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If you are a parent or guardian 
              and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-6 mt-3">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Access your personal information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Request deletion of your data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Opt out of personalized advertising</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Uninstall the app at any time</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any 
              significant changes by posting the new Privacy Policy in the app and updating the 
              "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              If you have any questions about this Privacy Policy or our app, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Email: <a href="mailto:privacy@yourapp.com" className="text-primary hover:underline">
                  privacy@yourapp.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyApp;
