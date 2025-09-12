import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Brain, CloudSun, TrendingUp, ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your crop health and provide actionable insights."
    },
    {
      icon: CloudSun,
      title: "Weather Integration", 
      description: "Real-time weather monitoring and forecasting to help protect your crops from adverse conditions."
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description: "Monitor plant height, leaf color, and overall health with detailed progress analytics."
    },
    {
      icon: Shield,
      title: "Preventive Measures",
      description: "Get early warnings and preventive recommendations to avoid crop damage and maximize yield."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Smart Farming with 
              <span className="block bg-gradient-harvest bg-clip-text text-transparent">
                AI Plant Health
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Monitor your crops with precision agriculture technology. Get AI-powered insights on plant health, 
              weather conditions, and preventive measures to maximize your harvest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-earth hover:opacity-90 transition-opacity group">
                  Start Monitoring
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Precision Agriculture Made Simple
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with practical farming wisdom 
              to help you make data-driven decisions for healthier crops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="shadow-card hover:shadow-natural transition-all duration-300 hover:-translate-y-2">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-earth rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-primary">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-growth">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <Leaf className="mx-auto h-16 w-16 mb-6 opacity-90" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Join thousands of farmers who are already using AI-powered insights to increase 
              their crop yields and reduce losses. Start your precision agriculture journey today.
            </p>
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 group">
                <Zap className="mr-2 h-5 w-5 group-hover:text-warning transition-colors" />
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold">AgriSmart</span>
            </div>
            <p className="text-primary-foreground/70">
              Empowering farmers with AI-driven agricultural insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
