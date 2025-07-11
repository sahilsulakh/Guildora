
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Star, 
  Trophy, 
  Calendar, 
  Settings, 
  Crown,
  Shield,
  Target,
  Zap,
  Award
} from "lucide-react";

const userStats = {
  username: "Alex_Gaming",
  level: 28,
  xp: 12450,
  nextLevelXp: 15000,
  totalQuests: 89,
  completedQuests: 76,
  badges: 15,
  joinDate: "March 2023",
  currentStreak: 23,
  avatar: "A",
};

const badges = [
  { name: "Quest Master", icon: Trophy, color: "from-yellow-500 to-orange-500", earned: true },
  { name: "Code Warrior", icon: Shield, color: "from-blue-500 to-cyan-500", earned: true },
  { name: "Creative Soul", icon: Star, color: "from-purple-500 to-pink-500", earned: true },
  { name: "Team Player", icon: Target, color: "from-green-500 to-emerald-500", earned: true },
  { name: "Lightning Fast", icon: Zap, color: "from-yellow-400 to-yellow-600", earned: false },
  { name: "Legend", icon: Crown, color: "from-amber-500 to-orange-600", earned: false },
];

const recentAchievements = [
  { title: "Completed Weekly Challenge", date: "2 days ago", xp: 250 },
  { title: "Unlocked Code Warrior Badge", date: "5 days ago", xp: 100 },
  { title: "Reached Level 28", date: "1 week ago", xp: 500 },
  { title: "23-day Quest Streak", date: "1 week ago", xp: 300 },
];

export const UserProfile = () => {
  const xpProgress = (userStats.xp / userStats.nextLevelXp) * 100;
  const questProgress = (userStats.completedQuests / userStats.totalQuests) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
          <p className="text-gray-400">Manage your profile and view your achievements</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25">
          <Settings className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg mx-auto">
                <span className="text-3xl font-bold text-white">{userStats.avatar}</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                  Level {userStats.level}
                </Badge>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">{userStats.username}</h2>
            <p className="text-gray-400 mb-4">Member since {userStats.joinDate}</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">XP Progress</span>
                  <span className="text-white">{userStats.xp.toLocaleString()} / {userStats.nextLevelXp.toLocaleString()}</span>
                </div>
                <Progress value={xpProgress} className="h-2 bg-white/10" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{userStats.badges}</p>
                  <p className="text-gray-400 text-sm">Badges</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">{userStats.currentStreak}</p>
                  <p className="text-gray-400 text-sm">Day Streak</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats & Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{userStats.completedQuests}</p>
                <p className="text-gray-400 text-sm">Completed Quests</p>
                <Progress value={questProgress} className="h-1 mt-2 bg-white/10" />
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{userStats.xp.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Total XP Earned</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{userStats.currentStreak}</p>
                <p className="text-gray-400 text-sm">Current Streak</p>
              </CardContent>
            </Card>
          </div>

          {/* Badges Collection */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Badge Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  
                  return (
                    <div 
                      key={index} 
                      className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                        badge.earned 
                          ? 'bg-white/5 border-white/20 hover:bg-white/10' 
                          : 'bg-gray-800/20 border-gray-700/30 opacity-50'
                      }`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${badge.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg ${
                        badge.earned ? '' : 'grayscale'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className={`font-medium text-sm ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                        {badge.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div>
                      <p className="text-white font-medium">{achievement.title}</p>
                      <p className="text-gray-400 text-sm">{achievement.date}</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                      +{achievement.xp} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
