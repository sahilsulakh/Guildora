
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Star, Crown, Shield, Sword, Zap, Settings } from "lucide-react";

interface RankManagementProps {
  selectedServer: string;
}

const ranks = [
  {
    id: 1,
    name: "Legendary",
    description: "Elite members with exceptional contributions",
    xpRequired: 10000,
    color: "from-yellow-500 to-orange-500",
    icon: Crown,
    members: 5,
    perks: ["Exclusive channels", "Priority support", "Special badges"],
  },
  {
    id: 2,
    name: "Master",
    description: "Experienced community leaders",
    xpRequired: 5000,
    color: "from-purple-500 to-pink-500",
    icon: Shield,
    members: 23,
    perks: ["Moderator powers", "Custom role color", "Event priority"],
  },
  {
    id: 3,
    name: "Expert",
    description: "Skilled and active community members",
    xpRequired: 2500,
    color: "from-blue-500 to-cyan-500",
    icon: Sword,
    members: 67,
    perks: ["Voice priority", "Reaction perks", "Beta access"],
  },
  {
    id: 4,
    name: "Apprentice",
    description: "Growing members learning the ropes",
    xpRequired: 1000,
    color: "from-green-500 to-teal-500",
    icon: Star,
    members: 145,
    perks: ["Basic perks", "Community access", "Learning resources"],
  },
];

export const RankManagement = ({ selectedServer }: RankManagementProps) => {
  const [newRank, setNewRank] = useState({
    name: "",
    description: "",
    xpRequired: "",
    color: "from-blue-500 to-purple-500",
    perks: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Rank Management</h1>
          <p className="text-gray-400">Create and manage ranks for {selectedServer}</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Create Rank
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Create New Rank</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Rank Name</label>
                  <Input 
                    placeholder="Enter rank name..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={newRank.name}
                    onChange={(e) => setNewRank({...newRank, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">XP Required</label>
                  <Input 
                    type="number"
                    placeholder="1000"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={newRank.xpRequired}
                    onChange={(e) => setNewRank({...newRank, xpRequired: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                <Textarea 
                  placeholder="Describe this rank..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none"
                  rows={3}
                  value={newRank.description}
                  onChange={(e) => setNewRank({...newRank, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Color Theme</label>
                <select 
                  className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                  value={newRank.color}
                  onChange={(e) => setNewRank({...newRank, color: e.target.value})}
                >
                  <option value="from-blue-500 to-purple-500">Blue to Purple</option>
                  <option value="from-green-500 to-teal-500">Green to Teal</option>
                  <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
                  <option value="from-pink-500 to-red-500">Pink to Red</option>
                  <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Perks (comma separated)</label>
                <Input 
                  placeholder="Exclusive channels, Priority support, Special badges"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  value={newRank.perks}
                  onChange={(e) => setNewRank({...newRank, perks: e.target.value})}
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Create Rank
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ranks.map((rank) => {
          const RankIcon = rank.icon;
          
          return (
            <Card key={rank.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${rank.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <RankIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">{rank.name}</CardTitle>
                      <p className="text-gray-400 text-sm">{rank.xpRequired.toLocaleString()} XP required</p>
                    </div>
                  </div>
                  <Badge className="text-blue-400 bg-blue-500/20 border-blue-500/30">
                    {rank.members} members
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">{rank.description}</p>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Perks & Benefits</h4>
                  <div className="flex flex-wrap gap-2">
                    {rank.perks.map((perk, index) => (
                      <Badge key={index} className="text-xs text-purple-300 bg-purple-500/20 border-purple-500/30">
                        {perk}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-white border border-purple-500/30">
                    Edit Rank
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
