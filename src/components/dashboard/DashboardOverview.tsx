
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, CheckCircle, Calendar, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardOverviewProps {
  selectedServer: string;
}

const stats = [
  {
    title: "Active Members",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Completed Quests",
    value: "89",
    change: "+23%",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Total XP Earned",
    value: "45,678",
    change: "+8%",
    icon: Star,
    color: "from-purple-500 to-violet-500",
  },
  {
    title: "Active Quests",
    value: "12",
    change: "+3",
    icon: Calendar,
    color: "from-orange-500 to-red-500",
  },
];

const recentActivity = [
  { user: "Alex_Gaming", action: "completed quest", quest: "Weekly Challenge", xp: 250, time: "2 minutes ago" },
  { user: "Sarah_Codes", action: "unlocked badge", quest: "Code Warrior", xp: 100, time: "5 minutes ago" },
  { user: "Mike_Artist", action: "joined quest", quest: "Creative Showcase", xp: 0, time: "10 minutes ago" },
  { user: "Luna_Writer", action: "completed quest", quest: "Story Time", xp: 180, time: "15 minutes ago" },
];

export const DashboardOverview = ({ selectedServer }: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening in {selectedServer}</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25">
          Create New Quest
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-green-400 text-sm font-medium mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{activity.user[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      <span className="text-purple-400">{activity.user}</span> {activity.action}{" "}
                      <span className="text-blue-400">"{activity.quest}"</span>
                    </p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
                {activity.xp > 0 && (
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                    <span className="text-yellow-400 font-medium">+{activity.xp} XP</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
