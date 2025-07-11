
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Gift, Trophy, Star, Gem, Zap, Coins, Settings } from "lucide-react";

interface RewardManagementProps {
  selectedServer: string;
}

const rewards = [
  {
    id: 1,
    name: "Champion's Crown",
    description: "Exclusive crown badge for tournament winners",
    cost: 1000,
    type: "badge",
    rarity: "legendary",
    icon: Trophy,
    claimed: 12,
    available: true,
  },
  {
    id: 2,
    name: "VIP Access",
    description: "30-day access to exclusive VIP channels",
    cost: 500,
    type: "access",
    rarity: "epic",
    icon: Star,
    claimed: 45,
    available: true,
  },
  {
    id: 3,
    name: "Custom Role Color",
    description: "Personalize your role with any color",
    cost: 750,
    type: "cosmetic",
    rarity: "rare",
    icon: Gem,
    claimed: 89,
    available: true,
  },
  {
    id: 4,
    name: "XP Booster",
    description: "2x XP gain for 7 days",
    cost: 250,
    type: "boost",
    rarity: "common",
    icon: Zap,
    claimed: 156,
    available: true,
  },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
    case "epic":
      return "text-purple-400 bg-purple-500/20 border-purple-500/30";
    case "rare":
      return "text-blue-400 bg-blue-500/20 border-blue-500/30";
    case "common":
      return "text-green-400 bg-green-500/20 border-green-500/30";
    default:
      return "text-gray-400 bg-gray-500/20 border-gray-500/30";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "badge":
      return Trophy;
    case "access":
      return Star;
    case "cosmetic":
      return Gem;
    case "boost":
      return Zap;
    default:
      return Gift;
  }
};

export const RewardManagement = ({ selectedServer }: RewardManagementProps) => {
  const [newReward, setNewReward] = useState({
    name: "",
    description: "",
    cost: "",
    type: "badge",
    rarity: "common",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reward Management</h1>
          <p className="text-gray-400">Create and manage rewards for {selectedServer}</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Create Reward
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Create New Reward</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Reward Name</label>
                  <Input 
                    placeholder="Enter reward name..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={newReward.name}
                    onChange={(e) => setNewReward({...newReward, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">XP Cost</label>
                  <Input 
                    type="number"
                    placeholder="100"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    value={newReward.cost}
                    onChange={(e) => setNewReward({...newReward, cost: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                <Textarea 
                  placeholder="Describe this reward..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none"
                  rows={3}
                  value={newReward.description}
                  onChange={(e) => setNewReward({...newReward, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Type</label>
                  <select 
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                    value={newReward.type}
                    onChange={(e) => setNewReward({...newReward, type: e.target.value})}
                  >
                    <option value="badge">Badge</option>
                    <option value="access">Access</option>
                    <option value="cosmetic">Cosmetic</option>
                    <option value="boost">Boost</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Rarity</label>
                  <select 
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                    value={newReward.rarity}
                    onChange={(e) => setNewReward({...newReward, rarity: e.target.value})}
                  >
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Create Reward
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const RewardIcon = getTypeIcon(reward.type);
          
          return (
            <Card key={reward.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <RewardIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg leading-tight">{reward.name}</CardTitle>
                      <Badge className={getRarityColor(reward.rarity)}>
                        {reward.rarity}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Coins className="w-4 h-4" />
                      <span className="font-bold">{reward.cost}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm line-clamp-2">{reward.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{reward.claimed} claimed</span>
                  </div>
                  <Badge className={reward.available ? "text-green-400 bg-green-500/20 border-green-500/30" : "text-red-400 bg-red-500/20 border-red-500/30"}>
                    {reward.available ? "Available" : "Out of Stock"}
                  </Badge>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-white border border-purple-500/30">
                    Edit Reward
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
