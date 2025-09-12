import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Leaf, Thermometer, Droplets, Activity, Sprout } from "lucide-react";
import { getAllPlants } from "@/lib/PlantDatabase";

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

interface PlantHealthFormProps {
  onAnalyze: (data: PlantHealthData) => void;
}

const PlantHealthForm = ({ onAnalyze }: PlantHealthFormProps) => {
  const [formData, setFormData] = useState<PlantHealthData>({
    plantType: "",
    plantHeight: 30,
    leafColor: "green",
    temperature: 25,
    humidity: 60,
    soilMoisture: 45,
    soilNutrients: {
      nitrogen: 20,
      phosphorus: 15,
      potassium: 18,
    },
  });

  const plants = getAllPlants();

  const handleSubmit = () => {
    if (!formData.plantType) {
      alert("Please select a plant type first!");
      return;
    }
    onAnalyze(formData);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Leaf className="h-5 w-5" />
          Plant Health Assessment
        </CardTitle>
        <CardDescription>
          Select your plant type and enter parameters for specialized AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plant Type Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Sprout className="h-4 w-4 text-success" />
            Plant Type (Required)
          </Label>
          <Select
            value={formData.plantType}
            onValueChange={(value) => setFormData(prev => ({ ...prev, plantType: value }))}
          >
            <SelectTrigger className="border-muted">
              <SelectValue placeholder="Select your crop type..." />
            </SelectTrigger>
            <SelectContent>
              {plants.map((plant) => (
                <SelectItem key={plant.id} value={plant.id}>
                  {plant.name} ({plant.category})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formData.plantType && (
            <p className="text-xs text-muted-foreground">
              Selected: {plants.find(p => p.id === formData.plantType)?.name} - Specialized analysis will be applied
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="height">Plant Height (cm)</Label>
            <Input
              id="height"
              type="number"
              value={formData.plantHeight}
              onChange={(e) => setFormData(prev => ({ ...prev, plantHeight: Number(e.target.value) }))}
              className="border-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="leafColor">Leaf Color</Label>
            <Select
              value={formData.leafColor}
              onValueChange={(value) => setFormData(prev => ({ ...prev, leafColor: value }))}
            >
              <SelectTrigger className="border-muted">
                <SelectValue placeholder="Select leaf color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark-green">Dark Green</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="light-green">Light Green</SelectItem>
                <SelectItem value="yellow-green">Yellow Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-sky" />
              Temperature: {formData.temperature}°C
            </Label>
            <Slider
              value={[formData.temperature]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, temperature: value[0] }))}
              max={50}
              min={-10}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-sky" />
              Humidity: {formData.humidity}%
            </Label>
            <Slider
              value={[formData.humidity]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, humidity: value[0] }))}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-earth" />
              Soil Moisture: {formData.soilMoisture}%
            </Label>
            <Slider
              value={[formData.soilMoisture]}
              onValueChange={(value) => setFormData(prev => ({ ...prev, soilMoisture: value[0] }))}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-earth">Soil Nutrients (ppm)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Nitrogen: {formData.soilNutrients.nitrogen}</Label>
              <Slider
                value={[formData.soilNutrients.nitrogen]}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  soilNutrients: { ...prev.soilNutrients, nitrogen: value[0] }
                }))}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Phosphorus: {formData.soilNutrients.phosphorus}</Label>
              <Slider
                value={[formData.soilNutrients.phosphorus]}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  soilNutrients: { ...prev.soilNutrients, phosphorus: value[0] }
                }))}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Potassium: {formData.soilNutrients.potassium}</Label>
              <Slider
                value={[formData.soilNutrients.potassium]}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  soilNutrients: { ...prev.soilNutrients, potassium: value[0] }
                }))}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-earth hover:opacity-90 transition-opacity"
        >
          Analyze Plant Health
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlantHealthForm;