import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, MapPin, Thermometer, Droplets, Wind } from "lucide-react";

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
  };
  forecast: Array<{
    day: string;
    high: number;
    low: number;
    condition: string;
    precipitation: number;
  }>;
}

const WeatherCard = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>("Detecting location...");

  useEffect(() => {
    // Simulate getting location and weather data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In real implementation, you'd use these coordinates to fetch weather
          setLocation("Farm Location");
          // Simulate weather data
          setWeather({
            location: "Punjab, India",
            current: {
              temperature: 28,
              humidity: 65,
              windSpeed: 12,
              condition: "Partly Cloudy"
            },
            forecast: [
              { day: "Today", high: 32, low: 22, condition: "Sunny", precipitation: 0 },
              { day: "Tomorrow", high: 30, low: 20, condition: "Cloudy", precipitation: 10 },
              { day: "Day 3", high: 25, low: 18, condition: "Rain", precipitation: 80 },
              { day: "Day 4", high: 28, low: 19, condition: "Partly Cloudy", precipitation: 20 },
            ]
          });
        },
        () => {
          setLocation("Location access denied");
          // Provide default weather data
          setWeather({
            location: "Default Location",
            current: {
              temperature: 25,
              humidity: 60,
              windSpeed: 10,
              condition: "Clear"
            },
            forecast: [
              { day: "Today", high: 28, low: 18, condition: "Sunny", precipitation: 0 },
              { day: "Tomorrow", high: 26, low: 16, condition: "Cloudy", precipitation: 15 },
              { day: "Day 3", high: 22, low: 14, condition: "Rain", precipitation: 85 },
              { day: "Day 4", high: 25, low: 15, condition: "Partly Cloudy", precipitation: 25 },
            ]
          });
        }
      );
    }
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-6 w-6 text-warning" />;
      case "rain":
        return <CloudRain className="h-6 w-6 text-sky" />;
      case "cloudy":
      case "partly cloudy":
      default:
        return <Cloud className="h-6 w-6 text-muted-foreground" />;
    }
  };

  if (!weather) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-sky" />
            Weather Conditions
          </CardTitle>
          <CardDescription>Loading weather data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sky">
          <MapPin className="h-5 w-5" />
          Weather Conditions
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {weather.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Weather */}
        <div className="bg-gradient-sky rounded-lg p-4 text-sky-foreground">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{weather.current.temperature}°C</div>
              <div className="text-sm opacity-90">{weather.current.condition}</div>
            </div>
            {getWeatherIcon(weather.current.condition)}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              <span>Humidity: {weather.current.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4" />
              <span>Wind: {weather.current.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div>
          <h4 className="font-semibold text-earth mb-3">4-Day Forecast</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {weather.forecast.map((day) => (
              <div key={day.day} className="bg-muted rounded-lg p-3 text-center">
                <div className="text-sm font-medium text-muted-foreground mb-2">{day.day}</div>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">{day.high}°</div>
                  <div className="text-muted-foreground">{day.low}°</div>
                </div>
                {day.precipitation > 0 && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    {day.precipitation}% rain
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alerts */}
        {weather.forecast.some(day => day.precipitation > 70) && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
            <div className="flex items-center gap-2 text-warning-foreground">
              <CloudRain className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Heavy Rain Alert</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Heavy rainfall expected in the coming days. Consider protective measures for your crops.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;