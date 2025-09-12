import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, XCircle, Brain, TrendingUp, Sprout } from "lucide-react";
import { getPlantProfile, determineGrowthStage } from "@/lib/PlantDatabase";

interface HealthAnalysisProps {
  plantData: {
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
  };
}

const HealthAnalysis = ({ plantData }: HealthAnalysisProps) => {
  // Plant-Specific AI Analysis Logic
  const analyzeHealth = () => {
    const plantProfile = getPlantProfile(plantData.plantType);
    if (!plantProfile) {
      return {
        healthScore: 0,
        status: "Error",
        statusColor: "destructive",
        issues: ["Unknown plant type selected"],
        recommendations: ["Please select a valid plant type"],
        growthStage: "unknown",
        plantSpecific: null
      };
    }

    let healthScore = 100;
    const issues: string[] = [];
    const recommendations: string[] = [];
    const { optimalConditions } = plantProfile;

    // Growth Stage Analysis
    const growthStage = determineGrowthStage(plantProfile, plantData.plantHeight);
    
    // Plant-Specific Temperature Analysis
    if (plantData.temperature < optimalConditions.temperature.min || plantData.temperature > optimalConditions.temperature.max) {
      const severity = Math.abs(plantData.temperature - ((optimalConditions.temperature.min + optimalConditions.temperature.max) / 2));
      healthScore -= Math.min(30, severity * 2);
      issues.push(`Temperature stress for ${plantProfile.name} (optimal: ${optimalConditions.temperature.min}-${optimalConditions.temperature.max}°C)`);
      
      if (plantData.temperature < optimalConditions.temperature.min) {
        recommendations.push(`Increase temperature - ${plantProfile.name} needs warmth for optimal growth`);
      } else {
        recommendations.push(`Reduce temperature - ${plantProfile.name} is experiencing heat stress`);
      }
    }

    // Plant-Specific Humidity Analysis
    if (plantData.humidity < optimalConditions.humidity.min || plantData.humidity > optimalConditions.humidity.max) {
      const severity = Math.abs(plantData.humidity - ((optimalConditions.humidity.min + optimalConditions.humidity.max) / 2));
      healthScore -= Math.min(25, severity * 0.5);
      issues.push(`Humidity levels not optimal for ${plantProfile.name} (optimal: ${optimalConditions.humidity.min}-${optimalConditions.humidity.max}%)`);
      
      if (plantData.humidity < optimalConditions.humidity.min) {
        recommendations.push(`Increase humidity - ${plantProfile.name} requires more moisture in air`);
      } else {
        recommendations.push(`Reduce humidity - risk of fungal diseases in ${plantProfile.name}`);
      }
    }

    // Plant-Specific Soil Moisture Analysis
    if (plantData.soilMoisture < optimalConditions.soilMoisture.min) {
      healthScore -= 30;
      issues.push(`Soil moisture too low for ${plantProfile.name} - drought stress`);
      recommendations.push(`Increase irrigation - ${plantProfile.name} needs consistent moisture`);
    } else if (plantData.soilMoisture > optimalConditions.soilMoisture.max) {
      healthScore -= 25;
      issues.push(`Soil moisture too high for ${plantProfile.name} - root rot risk`);
      recommendations.push(`Improve drainage - ${plantProfile.name} is sensitive to waterlogging`);
    }

    // Plant-Specific Nutrient Analysis
    const { nitrogen, phosphorus, potassium } = plantData.soilNutrients;
    const { nutrients } = optimalConditions;
    
    if (nitrogen < nutrients.nitrogen.min) {
      healthScore -= 20;
      issues.push(`Nitrogen deficiency for ${plantProfile.name}`);
      recommendations.push(`Apply nitrogen fertilizer - ${plantProfile.name} requires ${nutrients.nitrogen.min}-${nutrients.nitrogen.max} ppm`);
    } else if (nitrogen > nutrients.nitrogen.max) {
      healthScore -= 15;
      issues.push(`Excess nitrogen for ${plantProfile.name}`);
      recommendations.push(`Reduce nitrogen application - may delay flowering in ${plantProfile.name}`);
    }

    if (phosphorus < nutrients.phosphorus.min) {
      healthScore -= 15;
      issues.push(`Phosphorus deficiency for ${plantProfile.name}`);
      recommendations.push(`Add phosphorus - essential for ${plantProfile.name} root development`);
    }

    if (potassium < nutrients.potassium.min) {
      healthScore -= 15;
      issues.push(`Potassium deficiency for ${plantProfile.name}`);
      recommendations.push(`Apply potassium fertilizer - improves ${plantProfile.name} disease resistance`);
    }

    // Plant-Specific Leaf Color Analysis
    if (plantProfile.leafColorIndicators.diseased.includes(plantData.leafColor)) {
      healthScore -= 35;
      issues.push(`Unhealthy leaf coloration in ${plantProfile.name} - possible disease`);
      recommendations.push(`Check for ${plantProfile.commonDiseases.join(', ')} - common in ${plantProfile.name}`);
    } else if (plantProfile.leafColorIndicators.deficiency.includes(plantData.leafColor)) {
      healthScore -= 20;
      issues.push(`Nutrient deficiency symptoms in ${plantProfile.name} leaves`);
      recommendations.push(`Investigate nutrient deficiency - ${plantProfile.name} showing deficiency signs`);
    }

    // Add plant-specific care recommendations
    if (healthScore < 70) {
      recommendations.push(...plantProfile.specificCare.slice(0, 2));
    }

    const status = healthScore >= 80 ? "Excellent" : healthScore >= 60 ? "Good" : healthScore >= 40 ? "Fair" : "Poor";
    const statusColor = healthScore >= 80 ? "success" : healthScore >= 60 ? "success" : healthScore >= 40 ? "warning" : "destructive";

    return { 
      healthScore: Math.max(0, healthScore), 
      status, 
      statusColor, 
      issues, 
      recommendations,
      growthStage,
      plantSpecific: plantProfile
    };
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

        {/* Plant-Specific Information */}
        {analysis.plantSpecific && (
          <div className="bg-gradient-growth rounded-lg p-4 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Sprout className="h-5 w-5" />
              <h4 className="font-semibold">{analysis.plantSpecific.name} Analysis</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Growth Stage:</strong> {analysis.growthStage}</p>
                <p><strong>Category:</strong> {analysis.plantSpecific.category}</p>
                <p><strong>Expected Height:</strong> {analysis.plantSpecific.growthStages[analysis.growthStage as keyof typeof analysis.plantSpecific.growthStages]?.heightRange?.join('-') || 'Variable'} cm</p>
              </div>
              <div>
                <p><strong>Harvest Time:</strong> {analysis.plantSpecific.harvestTime}</p>
                <p><strong>Climate:</strong> {analysis.plantSpecific.climate.join(', ')}</p>
              </div>
            </div>
          </div>
        )}

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
                <Badge variant={
                  analysis.plantSpecific && 
                  plantData.temperature >= analysis.plantSpecific.optimalConditions.temperature.min && 
                  plantData.temperature <= analysis.plantSpecific.optimalConditions.temperature.max 
                  ? "default" : "destructive"
                }>
                  {analysis.plantSpecific && 
                   plantData.temperature >= analysis.plantSpecific.optimalConditions.temperature.min && 
                   plantData.temperature <= analysis.plantSpecific.optimalConditions.temperature.max 
                   ? "Optimal" : "Stress"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Humidity</span>
                <Badge variant={
                  analysis.plantSpecific && 
                  plantData.humidity >= analysis.plantSpecific.optimalConditions.humidity.min && 
                  plantData.humidity <= analysis.plantSpecific.optimalConditions.humidity.max 
                  ? "default" : "destructive"
                }>
                  {analysis.plantSpecific && 
                   plantData.humidity >= analysis.plantSpecific.optimalConditions.humidity.min && 
                   plantData.humidity <= analysis.plantSpecific.optimalConditions.humidity.max 
                   ? "Good" : "Poor"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Soil Moisture</span>
                <Badge variant={
                  analysis.plantSpecific && 
                  plantData.soilMoisture >= analysis.plantSpecific.optimalConditions.soilMoisture.min && 
                  plantData.soilMoisture <= analysis.plantSpecific.optimalConditions.soilMoisture.max 
                  ? "default" : "destructive"
                }>
                  {analysis.plantSpecific && 
                   plantData.soilMoisture >= analysis.plantSpecific.optimalConditions.soilMoisture.min && 
                   plantData.soilMoisture <= analysis.plantSpecific.optimalConditions.soilMoisture.max 
                   ? "Adequate" : "Critical"}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Nitrogen</span>
                <Badge variant={
                  analysis.plantSpecific && 
                  plantData.soilNutrients.nitrogen >= analysis.plantSpecific.optimalConditions.nutrients.nitrogen.min 
                  ? "default" : "destructive"
                }>
                  {analysis.plantSpecific && 
                   plantData.soilNutrients.nitrogen >= analysis.plantSpecific.optimalConditions.nutrients.nitrogen.min 
                   ? "Sufficient" : "Low"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Phosphorus</span>
                <Badge variant={
                  analysis.plantSpecific && 
                  plantData.soilNutrients.phosphorus >= analysis.plantSpecific.optimalConditions.nutrients.phosphorus.min 
                  ? "default" : "destructive"
                }>
                  {analysis.plantSpecific && 
                   plantData.soilNutrients.phosphorus >= analysis.plantSpecific.optimalConditions.nutrients.phosphorus.min 
                   ? "Sufficient" : "Low"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Potassium</span>
                <Badge variant={
                  analysis.plantSpecific && 
                  plantData.soilNutrients.potassium >= analysis.plantSpecific.optimalConditions.nutrients.potassium.min 
                  ? "default" : "destructive"
                }>
                  {analysis.plantSpecific && 
                   plantData.soilNutrients.potassium >= analysis.plantSpecific.optimalConditions.nutrients.potassium.min 
                   ? "Sufficient" : "Low"}
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

        {/* Plant-Specific Tips */}
        {analysis.plantSpecific && (
          <div className="bg-muted rounded-lg p-4">
            <h5 className="font-semibold text-earth mb-2">Plant-Specific Care Tips for {analysis.plantSpecific.name}</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              {analysis.plantSpecific.specificCare.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Common Diseases:</strong> {analysis.plantSpecific.commonDiseases.join(', ')}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Suitable Climate:</strong> {analysis.plantSpecific.climate.join(', ')}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthAnalysis;