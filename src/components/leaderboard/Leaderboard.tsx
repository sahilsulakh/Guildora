
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Trophy, Medal, Star, TrendingUp } from "lucide-react";

interface LeaderboardProps {
  selectedServer: string;
}

const leaderboardData = [
  {
    rank: 1,
    user: "Alex_Gaming",
    xp: 12450,
    level: 28,
    badges: 15,
    weeklyXp: 890,
    avatar: "A",
    color: "from-yellow-500 to-orange-500",
    rankIcon: Crown,
    rankColor: "text-yellow-400",
  },
  {
    rank: 2,
    user: "Sarah_Codes",
    xp: 11230,
    level: 26,
    badges: 12,
    weeklyXp: 750,
    avatar: "S",
    color: "from-gray-400 to-gray-600",
    rankIcon: Trophy,
    rankColor: "text-gray-400",
  },
  {
    rank: 3,
    user: "Mike_Artist",
    xp: 10890,
    level: 25,
    badges: 11,
    weeklyXp: 680,
    avatar: "M",
    color: "from-amber-600 to-amber-800",
    rankIcon: Medal,
    rankColor: "text-amber-600",
  },
  {
    rank: 4,
    user: "Luna_Writer",
    xp: 9670,
    level: 23,
    badges: 9,
    weeklyXp: 520,
    avatar: "L",
    color: "from-purple-500 to-pink-500",
    rankIcon: Star,
    rankColor: "text-purple-400",
  },
  {
    rank: 5,
    user: "Dev_Master",
    xp: 8950,
    level: 21,
    badges: 8,
    weeklyXp: 480,
    avatar: "D",
    color: "from-blue-500 to-cyan-500",
    rankIcon: Star,
    rankColor: "text-blue-400",
  },
  {
    rank: 6,
    user: "Creative_Soul",
    xp: 8340,
    level: 20,
    badges: 7,
    weeklyXp: 420,
    avatar: "C",
    color: "from-green-500 to-emerald-500",
    rankIcon: Star,
    rankColor: "text-green-400",
  },
];

const getRankDisplay = (rank: number) => {
  if (rank <= 3) {
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
        <span className="text-yellow-400 font-bold text-sm">#{rank}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">
      <span className="text-gray-400 font-medium text-sm">#{rank}</span>
    </div>
  );
};

export const Leaderboard = ({ selectedServer }: LeaderboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-gray-400">Top performers in {selectedServer}</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Weekly</Badge>
          <Badge variant="outline" className="text-gray-400 border-gray-600">All Time</Badge>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {leaderboardData.slice(0, 3).map((member, index) => {
          const RankIcon = member.rankIcon;
          const positions = [1, 0, 2]; // Second place in middle for visual hierarchy
          const actualMember = leaderboardData[positions[index]];
          
          return (
            <Card 
              key={actualMember.user} 
              className={`bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 ${
                actualMember.rank === 1 ? 'md:order-2 ring-2 ring-yellow-500/30' : 
                actualMember.rank === 2 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className={`w-20 h-20 bg-gradient-to-r ${actualMember.color} rounded-full flex items-center justify-center shadow-lg mx-auto`}>
                    <span className="text-2xl font-bold text-white">{actualMember.avatar}</span>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <RankIcon className={`w-8 h-8 ${actualMember.rankColor}`} />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{actualMember.user}</h3>
                <div className="space-y-2">
                  <div className="flex justify-center items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-2xl font-bold text-yellow-400">{actualMember.xp.toLocaleString()}</span>
                    <span className="text-gray-400">XP</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Level {actualMember.level} • {actualMember.badges} badges
                  </div>
                  <div className="flex items-center justify-center gap-1 text-green-400 text-sm">
                    <TrendingUp className="w-3 h-3" />
                    +{actualMember.weeklyXp} this week
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Full Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboardData.map((member) => {
              const RankIcon = member.rankIcon;
              
              return (
                <div 
                  key={member.user} 
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {getRankDisplay(member.rank)}
                    <div className={`w-12 h-12 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-lg font-bold text-white">{member.avatar}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{member.user}</p>
                      <p className="text-gray-400 text-sm">Level {member.level} • {member.badges} badges</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-white">{member.xp.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="w-3 h-3" />
                      +{member.weeklyXp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
