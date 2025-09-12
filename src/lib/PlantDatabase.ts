export interface PlantProfile {
  id: string;
  name: string;
  category: string;
  optimalConditions: {
    temperature: { min: number; max: number };
    humidity: { min: number; max: number };
    soilMoisture: { min: number; max: number };
    nutrients: {
      nitrogen: { min: number; max: number };
      phosphorus: { min: number; max: number };
      potassium: { min: number; max: number };
    };
  };
  growthStages: {
    seedling: { heightRange: [number, number]; durationDays: number };
    vegetative: { heightRange: [number, number]; durationDays: number };
    flowering: { heightRange: [number, number]; durationDays: number };
    fruiting?: { heightRange: [number, number]; durationDays: number };
  };
  leafColorIndicators: {
    healthy: string[];
    deficiency: string[];
    diseased: string[];
  };
  commonDiseases: string[];
  specificCare: string[];
  harvestTime: string;
  climate: string[];
}

export const PLANT_DATABASE: Record<string, PlantProfile> = {
  "tomato": {
    id: "tomato",
    name: "Tomato",
    category: "Vegetable",
    optimalConditions: {
      temperature: { min: 18, max: 29 },
      humidity: { min: 60, max: 80 },
      soilMoisture: { min: 60, max: 85 },
      nutrients: {
        nitrogen: { min: 25, max: 40 },
        phosphorus: { min: 15, max: 25 },
        potassium: { min: 20, max: 35 }
      }
    },
    growthStages: {
      seedling: { heightRange: [5, 15], durationDays: 21 },
      vegetative: { heightRange: [15, 60], durationDays: 35 },
      flowering: { heightRange: [60, 120], durationDays: 28 },
      fruiting: { heightRange: [80, 150], durationDays: 45 }
    },
    leafColorIndicators: {
      healthy: ["dark-green", "green"],
      deficiency: ["light-green", "yellow-green"],
      diseased: ["yellow", "brown"]
    },
    commonDiseases: ["Blight", "Mosaic Virus", "Fusarium Wilt"],
    specificCare: [
      "Provide support stakes for tall varieties",
      "Prune suckers regularly",
      "Deep watering 2-3 times per week",
      "Mulch around base to retain moisture"
    ],
    harvestTime: "75-85 days from transplant",
    climate: ["Warm temperate", "Mediterranean", "Subtropical"]
  },
  "wheat": {
    id: "wheat",
    name: "Wheat",
    category: "Cereal",
    optimalConditions: {
      temperature: { min: 12, max: 25 },
      humidity: { min: 40, max: 70 },
      soilMoisture: { min: 40, max: 70 },
      nutrients: {
        nitrogen: { min: 30, max: 50 },
        phosphorus: { min: 20, max: 30 },
        potassium: { min: 15, max: 25 }
      }
    },
    growthStages: {
      seedling: { heightRange: [2, 10], durationDays: 14 },
      vegetative: { heightRange: [10, 40], durationDays: 60 },
      flowering: { heightRange: [40, 80], durationDays: 21 },
      fruiting: { heightRange: [60, 100], durationDays: 35 }
    },
    leafColorIndicators: {
      healthy: ["green", "dark-green"],
      deficiency: ["light-green", "yellow-green"],
      diseased: ["yellow", "brown"]
    },
    commonDiseases: ["Rust", "Smut", "Powdery Mildew"],
    specificCare: [
      "Plant in well-drained soil",
      "Apply nitrogen fertilizer in split doses",
      "Monitor for pest infestations",
      "Ensure good air circulation"
    ],
    harvestTime: "110-130 days from sowing",
    climate: ["Temperate", "Continental", "Mediterranean"]
  },
  "rice": {
    id: "rice",
    name: "Rice",
    category: "Cereal",
    optimalConditions: {
      temperature: { min: 20, max: 35 },
      humidity: { min: 70, max: 90 },
      soilMoisture: { min: 80, max: 100 },
      nutrients: {
        nitrogen: { min: 35, max: 55 },
        phosphorus: { min: 18, max: 28 },
        potassium: { min: 25, max: 40 }
      }
    },
    growthStages: {
      seedling: { heightRange: [5, 20], durationDays: 21 },
      vegetative: { heightRange: [20, 60], durationDays: 45 },
      flowering: { heightRange: [60, 100], durationDays: 35 },
      fruiting: { heightRange: [80, 120], durationDays: 30 }
    },
    leafColorIndicators: {
      healthy: ["green", "dark-green"],
      deficiency: ["light-green", "yellow-green"],
      diseased: ["yellow", "brown"]
    },
    commonDiseases: ["Blast", "Bacterial Blight", "Sheath Rot"],
    specificCare: [
      "Maintain consistent water levels",
      "Apply organic matter regularly",
      "Control weeds in early stages",
      "Monitor water pH levels"
    ],
    harvestTime: "120-150 days from sowing",
    climate: ["Tropical", "Subtropical", "Monsoon"]
  },
  "maize": {
    id: "maize",
    name: "Maize (Corn)",
    category: "Cereal",
    optimalConditions: {
      temperature: { min: 15, max: 32 },
      humidity: { min: 50, max: 75 },
      soilMoisture: { min: 50, max: 80 },
      nutrients: {
        nitrogen: { min: 40, max: 60 },
        phosphorus: { min: 25, max: 35 },
        potassium: { min: 30, max: 45 }
      }
    },
    growthStages: {
      seedling: { heightRange: [10, 30], durationDays: 14 },
      vegetative: { heightRange: [30, 150], durationDays: 50 },
      flowering: { heightRange: [150, 250], durationDays: 21 },
      fruiting: { heightRange: [200, 300], durationDays: 40 }
    },
    leafColorIndicators: {
      healthy: ["dark-green", "green"],
      deficiency: ["light-green", "yellow-green"],
      diseased: ["yellow", "brown"]
    },
    commonDiseases: ["Leaf Blight", "Smut", "Downy Mildew"],
    specificCare: [
      "Hill up soil around base for support",
      "Side-dress with nitrogen mid-season",
      "Ensure deep root zone moisture",
      "Watch for corn borer damage"
    ],
    harvestTime: "90-120 days from planting",
    climate: ["Temperate", "Subtropical", "Continental"]
  },
  "cotton": {
    id: "cotton",
    name: "Cotton",
    category: "Fiber Crop",
    optimalConditions: {
      temperature: { min: 20, max: 35 },
      humidity: { min: 45, max: 70 },
      soilMoisture: { min: 45, max: 75 },
      nutrients: {
        nitrogen: { min: 30, max: 45 },
        phosphorus: { min: 20, max: 30 },
        potassium: { min: 25, max: 40 }
      }
    },
    growthStages: {
      seedling: { heightRange: [5, 15], durationDays: 21 },
      vegetative: { heightRange: [15, 80], durationDays: 70 },
      flowering: { heightRange: [60, 120], durationDays: 45 },
      fruiting: { heightRange: [80, 150], durationDays: 50 }
    },
    leafColorIndicators: {
      healthy: ["green", "dark-green"],
      deficiency: ["light-green", "yellow-green"],
      diseased: ["yellow", "brown"]
    },
    commonDiseases: ["Bollworm", "Fusarium Wilt", "Bacterial Blight"],
    specificCare: [
      "Regular weeding in early stages",
      "Monitor for bollworm infestation",
      "Avoid overwatering during flowering",
      "Apply potash during boll formation"
    ],
    harvestTime: "160-200 days from sowing",
    climate: ["Semi-arid", "Subtropical", "Mediterranean"]
  },
  "potato": {
    id: "potato",
    name: "Potato",
    category: "Tuber Crop",
    optimalConditions: {
      temperature: { min: 15, max: 24 },
      humidity: { min: 65, max: 85 },
      soilMoisture: { min: 55, max: 80 },
      nutrients: {
        nitrogen: { min: 20, max: 35 },
        phosphorus: { min: 25, max: 40 },
        potassium: { min: 30, max: 50 }
      }
    },
    growthStages: {
      seedling: { heightRange: [5, 15], durationDays: 21 },
      vegetative: { heightRange: [15, 40], durationDays: 45 },
      flowering: { heightRange: [30, 60], durationDays: 30 },
      fruiting: { heightRange: [40, 80], durationDays: 35 }
    },
    leafColorIndicators: {
      healthy: ["green", "dark-green"],
      deficiency: ["light-green", "yellow-green"],
      diseased: ["yellow", "brown"]
    },
    commonDiseases: ["Late Blight", "Early Blight", "Potato Scab"],
    specificCare: [
      "Hill soil around plants regularly",
      "Avoid green tuber exposure to sunlight",
      "Consistent moisture during tuber formation",
      "Rotate crops to prevent disease buildup"
    ],
    harvestTime: "90-120 days from planting",
    climate: ["Temperate", "Cool subtropical", "Highland tropical"]
  }
};

export const getPlantProfile = (plantId: string): PlantProfile | null => {
  return PLANT_DATABASE[plantId] || null;
};

export const getAllPlants = (): PlantProfile[] => {
  return Object.values(PLANT_DATABASE);
};

export const getPlantsByCategory = (category: string): PlantProfile[] => {
  return Object.values(PLANT_DATABASE).filter(plant => plant.category === category);
};

export const determineGrowthStage = (plant: PlantProfile, height: number): string => {
  const { seedling, vegetative, flowering, fruiting } = plant.growthStages;
  
  if (height >= seedling.heightRange[0] && height <= seedling.heightRange[1]) {
    return "seedling";
  } else if (height >= vegetative.heightRange[0] && height <= vegetative.heightRange[1]) {
    return "vegetative";
  } else if (height >= flowering.heightRange[0] && height <= flowering.heightRange[1]) {
    return "flowering";
  } else if (fruiting && height >= fruiting.heightRange[0] && height <= fruiting.heightRange[1]) {
    return "fruiting";
  } else if (height < seedling.heightRange[0]) {
    return "early_seedling";
  } else {
    return "mature";
  }
};