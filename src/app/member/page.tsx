'use client';
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { UserProfile } from "@/components/profile/UserProfile";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { 
  Target, 
  Star, 
  Clock, 
  Trophy,
  Gift,
  Zap,
  CheckCircle,
  Calendar
} from "lucide-react";

const MemberDashboard = () => {
  const currentQuests = [
    {
      id: 1,
      title: "Discord Engagement Master",
      description: "Send 50 messages in community channels",
      progress: 35,
      maxProgress: 50,
      xpReward: 250,
      deadline: "2 days left",
      difficulty: "Easy",
      category: "Social"
    },
    {
      id: 2,
      title: "Event Participant",
      description: "Attend 3 community events this week",
      progress: 1,
      maxProgress: 3,
      xpReward: 500,
      deadline: "5 days left",
      difficulty: "Medium",
      category: "Events"
    },
    {
      id: 3,
      title: "Helper's Journey",
      description: "Help 10 new members in the server",
      progress: 7,
      maxProgress: 10,
      xpReward: 750,
      deadline: "1 week left",
      difficulty: "Hard",
      category: "Community"
    }
  ];

  const recentAchievements = [
    { name: "First Quest Complete", icon: Target, date: "2 days ago" },
    { name: "Helpful Member", icon: Star, date: "1 week ago" },
    { name: "Early Bird", icon: Clock, date: "2 weeks ago" }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total XP</p>
              <p className="text-3xl font-bold text-white">12,450</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rank</p>
              <p className="text-3xl font-bold text-white">#23</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-3xl font-bold text-white">42</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Rewards</p>
              <p className="text-3xl font-bold text-white">18</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Active Quests */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-purple-400" />
          Active Quests
        </h2>
        
        <div className="space-y-6">
          {currentQuests.map((quest) => (
            <div key={quest.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                      {quest.category}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {quest.difficulty}
                    </Badge>
                  </div>
                  <p className="text-gray-400 mb-4">{quest.description}</p>
                  
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400 text-sm">{quest.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm">+{quest.xpReward} XP</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{quest.progress}/{quest.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(quest.progress / quest.maxProgress) * 100} 
                      className="h-2 bg-gray-700"
                    />
                  </div>
                </div>
                
                <Button className="ml-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                  Continue
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Achievements */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Recent Achievements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <achievement.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">{achievement.name}</p>
                <p className="text-gray-400 text-sm">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const MemberPortal = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedServer, setSelectedServer] = useState("Community Hub");
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/discord-auth");
    }
  }, [router]);

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <MemberDashboard />;
      case "leaderboard":
        return <Leaderboard selectedServer={selectedServer} />;
      case "profile":
        return <UserProfile />;
      default:
        return <MemberDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="flex min-h-screen relative z-10">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView}
          portalType="member"
        />
        
        <div className="flex-1 flex flex-col">
          <Header selectedServer={selectedServer} />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MemberPortal;
