import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, Users, Leaf, Droplets } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Active Sensors",
      value: "24",
      change: "+2",
      trend: "up",
      icon: Activity,
      color: "text-success"
    },
    {
      title: "Healthy Plants",
      value: "89%",
      change: "+5%",
      trend: "up", 
      icon: Leaf,
      color: "text-success"
    },
    {
      title: "Avg Soil Moisture",
      value: "67%",
      change: "-3%",
      trend: "down",
      icon: Droplets,
      color: "text-sky"
    },
    {
      title: "Connected Farms",
      value: "156",
      change: "+12",
      trend: "up",
      icon: Users,
      color: "text-earth"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor = stat.trend === "up" ? "text-success" : "text-destructive";
        
        return (
          <Card key={stat.title} className="shadow-card hover:shadow-natural transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendIcon className={`mr-1 h-3 w-3 ${trendColor}`} />
                <span className={trendColor}>{stat.change}</span>
                <span className="ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;