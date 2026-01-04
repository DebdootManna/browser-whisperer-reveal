import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Eye,
  Fingerprint,
  Lock,
  Globe,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Github,
  ExternalLink,
  Palette,
  Cpu,
  Volume2,
  Type,
  Network,
  Monitor,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Palette,
      title: "Canvas Fingerprinting",
      description: "Detect how your browser renders graphics uniquely",
    },
    {
      icon: Cpu,
      title: "WebGL Analysis",
      description: "Identify your graphics card and driver information",
    },
    {
      icon: Volume2,
      title: "Audio Fingerprinting",
      description: "Test unique audio processing characteristics",
    },
    {
      icon: Type,
      title: "Font Detection",
      description: "Discover which fonts reveal your identity",
    },
    {
      icon: Network,
      title: "WebRTC Leak Test",
      description: "Check for IP address leaks through WebRTC",
    },
    {
      icon: Monitor,
      title: "Screen & Hardware",
      description: "Analyze display and device characteristics",
    },
    {
      icon: Globe,
      title: "Location & IP",
      description: "See your visible IP address and location",
    },
    {
      icon: Shield,
      title: "Privacy Score",
      description: "Get a comprehensive privacy protection rating",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="outline">
              <Shield className="w-3 h-3 mr-1" />
              Privacy & Security Test
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Browser Fingerprint Test
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover what information your browser reveals to websites and how
              unique your digital fingerprint is
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => navigate("/test")}
                className="text-lg px-8 py-6 h-auto group"
              >
                <Fingerprint className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Fingerprint Test
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/classic")}
                className="text-lg px-8 py-6 h-auto"
              >
                <Eye className="w-5 h-5 mr-2" />
                View Classic Mode
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <Card className="text-center border-2">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Fingerprinting Tests</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Client-Side Only</p>
              </CardContent>
            </Card>
            <Card className="text-center border-2">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">0</div>
                <p className="text-muted-foreground">Data Collected</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* What is Browser Fingerprinting */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What is Browser Fingerprinting?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Browser fingerprinting is a tracking technique that websites use
              to identify and track you online without cookies. It works by
              collecting information about your browser, device, and settings.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Every browser has unique characteristics - from installed fonts
              and screen resolution to how it renders graphics. Combined, these
              create a unique "fingerprint" that can identify you across
              websites.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Persistent Tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Works even when cookies are blocked
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Hard to Prevent</p>
                  <p className="text-sm text-muted-foreground">
                    Difficult to block without breaking websites
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Eye className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Invisible to Users</p>
                  <p className="text-sm text-muted-foreground">
                    No notification or indication when it happens
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fingerprint className="w-6 h-6" />
                How Unique Are You?
              </CardTitle>
              <CardDescription>
                Your browser fingerprint is created from:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Browser & OS</p>
                  <p className="text-sm text-muted-foreground">
                    Type, version, and settings
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Canvas & WebGL</p>
                  <p className="text-sm text-muted-foreground">
                    Graphics rendering differences
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Type className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Installed Fonts</p>
                  <p className="text-sm text-muted-foreground">
                    System fonts reveal your setup
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Hardware Details</p>
                  <p className="text-sm text-muted-foreground">
                    CPU, GPU, screen resolution
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Fingerprint Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our tool tests multiple fingerprinting techniques to show exactly
              what websites can learn about you
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Test */}
        <Card className="border-2 border-primary/20 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Lock className="w-6 h-6" />
              Why Should You Test Your Browser?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Understand Your Privacy
                </h3>
                <p className="text-muted-foreground">
                  Learn what information your browser is exposing and how unique
                  your fingerprint is compared to others.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Identify Vulnerabilities
                </h3>
                <p className="text-muted-foreground">
                  Discover potential privacy leaks like WebRTC exposing your
                  local IP address even when using a VPN.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Get Protection Recommendations
                </h3>
                <p className="text-muted-foreground">
                  Receive personalized suggestions on how to improve your
                  privacy and reduce your fingerprint uniqueness.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Test Your Protections
                </h3>
                <p className="text-muted-foreground">
                  Verify that your privacy tools and browser settings are
                  working effectively to protect you.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Your Privacy is Protected
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>100% Client-Side:</strong> All tests run completely in
                your browser. Nothing is sent to our servers.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>No Data Collection:</strong> We don't store, log, or
                transmit any of your fingerprint data.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                <strong>Open Source:</strong> Our code is transparent and
                available for review on GitHub.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Test Your Browser?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find out how unique your browser fingerprint is and learn how to
            protect your privacy online
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/test")}
            className="text-lg px-8 py-6 h-auto group"
          >
            <Fingerprint className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
            Start Your Fingerprint Test
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Fingerprint className="w-5 h-5" />
                Browser Fingerprint Test
              </h3>
              <p className="text-sm text-muted-foreground">
                A comprehensive tool to test and analyze your browser's
                fingerprint and privacy protections.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Learn More</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://coveryourtracks.eff.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    EFF Cover Your Tracks
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.eff.org/issues/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    Privacy at EFF
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.torproject.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    Tor Browser
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Project</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/DebdootManna/browser-whisperer-reveal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    Made with privacy in mind
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Browser Fingerprint Test. All tests
              run client-side. No data is collected.
            </p>
            <p className="mt-2">
              Educational tool for understanding browser fingerprinting and
              online privacy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
