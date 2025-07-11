
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, Users, Star, Clock, Trophy, Target } from "lucide-react";

interface TaskManagementProps {
  selectedServer: string;
}

const quests = [
  {
    id: 1,
    title: "Weekly Challenge",
    description: "Complete daily activities for 7 consecutive days",
    reward: "250 XP + Champion Badge",
    participants: 89,
    deadline: "3 days left",
    status: "active",
    difficulty: "medium",
    category: "engagement",
  },
  {
    id: 2,
    title: "Creative Showcase",
    description: "Share your original artwork in the gallery channel",
    reward: "180 XP + Artist Badge",
    participants: 34,
    deadline: "1 week left",
    status: "active",
    difficulty: "easy",
    category: "creative",
  },
  {
    id: 3,
    title: "Code Warrior",
    description: "Submit a coding project and help others debug",
    reward: "350 XP + Developer Badge",
    participants: 67,
    deadline: "5 days left",
    status: "active",
    difficulty: "hard",
    category: "technical",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return "text-green-400 bg-green-500/20 border-green-500/30";
    case "medium":
      return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
    case "hard":
      return "text-red-400 bg-red-500/20 border-red-500/30";
    default:
      return "text-gray-400 bg-gray-500/20 border-gray-500/30";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "engagement":
      return Users;
    case "creative":
      return Star;
    case "technical":
      return Target;
    default:
      return Trophy;
  }
};

export const TaskManagement = ({ selectedServer }: TaskManagementProps) => {
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    reward: "",
    difficulty: "medium",
    deadline: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Quest Management</h1>
          <p className="text-gray-400">Create and manage quests for {selectedServer}</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Create Quest
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Create New Quest</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Quest Title</label>
                <Input 
                  placeholder="Enter quest title..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  value={newQuest.title}
                  onChange={(e) => setNewQuest({...newQuest, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                <Textarea 
                  placeholder="Describe the quest objectives..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 resize-none"
                  rows={3}
                  value={newQuest.description}
                  onChange={(e) => setNewQuest({...newQuest, description: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Reward</label>
                <Input 
                  placeholder="e.g., 250 XP + Special Badge"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  value={newQuest.reward}
                  onChange={(e) => setNewQuest({...newQuest, reward: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Difficulty</label>
                  <select 
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-md text-white"
                    value={newQuest.difficulty}
                    onChange={(e) => setNewQuest({...newQuest, difficulty: e.target.value})}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Deadline</label>
                  <Input 
                    type="date"
                    className="bg-white/5 border-white/10 text-white"
                    value={newQuest.deadline}
                    onChange={(e) => setNewQuest({...newQuest, deadline: e.target.value})}
                  />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Create Quest
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {quests.map((quest) => {
          const CategoryIcon = getCategoryIcon(quest.category);
          
          return (
            <Card key={quest.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg leading-tight">{quest.title}</CardTitle>
                      <Badge className={getDifficultyColor(quest.difficulty)}>
                        {quest.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm line-clamp-2">{quest.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">{quest.reward}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{quest.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400">{quest.deadline}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 text-white border border-purple-500/30">
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                    Edit
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
