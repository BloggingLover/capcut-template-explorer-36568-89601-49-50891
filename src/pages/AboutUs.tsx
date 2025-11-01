import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const AboutUs = () => {
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
          <h1 className="text-4xl font-bold text-center">About Us</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8">
          <section className="bg-card rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Welcome to CapCut Template Finder</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We are dedicated to helping content creators discover the perfect CapCut templates for their videos. 
              Our platform makes it easy to browse, search, and find trending templates that will take your content 
              to the next level.
            </p>
          </section>

          <section className="bg-card rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to simplify the template discovery process and help creators find exactly what they need. 
              Whether you're looking for trending templates, specific categories, or advanced filtering options, 
              we've got you covered.
            </p>
          </section>

          <section className="bg-card rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Why Choose Us</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Access to thousands of CapCut templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Advanced search and filtering capabilities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Regular updates with trending templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Easy-to-use interface for all skill levels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Direct integration with CapCut app</span>
              </li>
            </ul>
          </section>

          <section className="bg-card rounded-lg p-8 shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-gradient-primary hover:opacity-90"
            >
              Contact Us
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
