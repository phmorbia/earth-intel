import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, XCircle, Brain, TrendingUp } from "lucide-react";

interface HealthAnalysisProps {
  plantData: {
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
  };
}

const HealthAnalysis = ({ plantData }: HealthAnalysisProps) => {
  // AI Analysis Logic (simplified)
  const analyzeHealth = () => {
    let healthScore = 100;
    const issues = [];
    const recommendations = [];

    // Temperature analysis
    if (plantData.temperature < 15 || plantData.temperature > 35) {
      healthScore -= 20;
      issues.push("Temperature stress detected");
      recommendations.push("Adjust greenhouse temperature or provide shade/heating");
    }

    // Humidity analysis
    if (plantData.humidity < 40 || plantData.humidity > 80) {
      healthScore -= 15;
      issues.push("Humidity levels not optimal");
      recommendations.push("Improve ventilation or irrigation system");
    }

    // Soil moisture analysis
    if (plantData.soilMoisture < 30) {
      healthScore -= 25;
      issues.push("Soil moisture too low - drought stress");
      recommendations.push("Increase irrigation frequency");
    } else if (plantData.soilMoisture > 80) {
      healthScore -= 20;
      issues.push("Soil moisture too high - root rot risk");
      recommendations.push("Improve drainage and reduce watering");
    }

    // Nutrient analysis
    const { nitrogen, phosphorus, potassium } = plantData.soilNutrients;
    if (nitrogen < 15) {
      healthScore -= 15;
      issues.push("Nitrogen deficiency");
      recommendations.push("Apply nitrogen-rich fertilizer");
    }
    if (phosphorus < 10) {
      healthScore -= 10;
      issues.push("Phosphorus deficiency");
      recommendations.push("Add phosphorus supplement to soil");
    }
    if (potassium < 12) {
      healthScore -= 10;
      issues.push("Potassium deficiency");
      recommendations.push("Apply potassium-rich fertilizer");
    }

    // Leaf color analysis
    if (plantData.leafColor === "yellow" || plantData.leafColor === "brown") {
      healthScore -= 30;
      issues.push("Unhealthy leaf coloration detected");
      recommendations.push("Check for diseases and nutrient deficiencies");
    }

    const status = healthScore >= 80 ? "Excellent" : healthScore >= 60 ? "Good" : healthScore >= 40 ? "Fair" : "Poor";
    const statusColor = healthScore >= 80 ? "success" : healthScore >= 60 ? "success" : healthScore >= 40 ? "warning" : "destructive";

    return { healthScore: Math.max(0, healthScore), status, statusColor, issues, recommendations };
  };

  const analysis = analyzeHealth();

  const getStatusIcon = () => {
    if (analysis.healthScore >= 80) return <CheckCircle className="h-5 w-5 text-success" />;
    if (analysis.healthScore >= 40) return <AlertTriangle className="h-5 w-5 text-warning" />;
    return <XCircle className="h-5 w-5 text-destructive" />;
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Brain className="h-5 w-5" />
          AI Health Analysis
        </CardTitle>
        <CardDescription>
          Comprehensive plant health assessment based on your input parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Health Score */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            {getStatusIcon()}
            <span className="text-2xl font-bold">{analysis.healthScore}%</span>
          </div>
          <Badge 
            variant={analysis.statusColor === "success" ? "default" : "destructive"}
            className="text-sm px-4 py-1"
          >
            {analysis.status} Health
          </Badge>
          <Progress value={analysis.healthScore} className="w-full" />
        </div>

        {/* Parameter Analysis */}
        <div className="space-y-4">
          <h4 className="font-semibold text-earth flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Parameter Assessment
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Temperature</span>
                <Badge variant={plantData.temperature >= 15 && plantData.temperature <= 35 ? "default" : "destructive"}>
                  {plantData.temperature >= 15 && plantData.temperature <= 35 ? "Optimal" : "Stress"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Humidity</span>
                <Badge variant={plantData.humidity >= 40 && plantData.humidity <= 80 ? "default" : "destructive"}>
                  {plantData.humidity >= 40 && plantData.humidity <= 80 ? "Good" : "Poor"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Soil Moisture</span>
                <Badge variant={plantData.soilMoisture >= 30 && plantData.soilMoisture <= 80 ? "default" : "destructive"}>
                  {plantData.soilMoisture >= 30 && plantData.soilMoisture <= 80 ? "Adequate" : "Critical"}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Nitrogen</span>
                <Badge variant={plantData.soilNutrients.nitrogen >= 15 ? "default" : "destructive"}>
                  {plantData.soilNutrients.nitrogen >= 15 ? "Sufficient" : "Low"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Phosphorus</span>
                <Badge variant={plantData.soilNutrients.phosphorus >= 10 ? "default" : "destructive"}>
                  {plantData.soilNutrients.phosphorus >= 10 ? "Sufficient" : "Low"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Potassium</span>
                <Badge variant={plantData.soilNutrients.potassium >= 12 ? "default" : "destructive"}>
                  {plantData.soilNutrients.potassium >= 12 ? "Sufficient" : "Low"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Issues & Recommendations */}
        {analysis.issues.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-destructive">Detected Issues</h4>
            {analysis.issues.map((issue, index) => (
              <Alert key={index} className="border-destructive/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{issue}</AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {analysis.recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-success">Recommended Actions</h4>
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Additional Tips */}
        <div className="bg-muted rounded-lg p-4">
          <h5 className="font-semibold text-earth mb-2">Pro Tips</h5>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Monitor parameters daily for best results</li>
            <li>• Consider weather conditions when making adjustments</li>
            <li>• Implement changes gradually to avoid plant shock</li>
            <li>• Keep detailed records for seasonal comparisons</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthAnalysis;