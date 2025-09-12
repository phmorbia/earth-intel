import { useState } from "react";
import DashboardStats from "@/components/DashboardStats";
import PlantHealthForm from "@/components/PlantHealthForm";
import HealthAnalysis from "@/components/HealthAnalysis";
import WeatherCard from "@/components/WeatherCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlantHealthData {
  plantType: string;
  plantHeight: number;
  leafColor: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  soilNutrients: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
}

const Dashboard = () => {
  const [analysisData, setAnalysisData] = useState<PlantHealthData | null>(null);

  const handleAnalysis = (data: PlantHealthData) => {
    setAnalysisData(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-primary">Farm Analytics Dashboard</h1>
              <p className="text-muted-foreground">Monitor your crops with AI-powered insights</p>
            </div>
          </div>
          <DashboardStats />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Forms and Analysis */}
          <div className="xl:col-span-2 space-y-8">
            <PlantHealthForm onAnalyze={handleAnalysis} />
            
            {analysisData && (
              <HealthAnalysis plantData={analysisData} />
            )}
          </div>

          {/* Right Column - Weather and Additional Info */}
          <div className="space-y-8">
            <WeatherCard />
            
            {/* Quick Tips Card */}
            <div className="bg-gradient-growth rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Smart Farming Tips</h3>
              <ul className="space-y-2 text-sm">
                <li>• Check soil moisture levels daily</li>
                <li>• Monitor weather forecasts for irrigation planning</li>
                <li>• Track nutrient levels weekly</li>
                <li>• Document growth patterns for optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;