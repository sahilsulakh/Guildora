
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Server, Users, Settings, Plus, Crown, Shield } from "lucide-react";

interface ServerManagementProps {
  onServerSelect: (server: string) => void;
}

const servers = [
  {
    name: "Community Hub",
    members: 1234,
    status: "online",
    role: "owner",
    color: "from-green-500 to-emerald-500",
    quests: 12,
    xp: 45678,
  },
  {
    name: "Gaming Guild",
    members: 892,
    status: "online",
    role: "admin",
    color: "from-blue-500 to-cyan-500",
    quests: 8,
    xp: 32451,
  },
  {
    name: "Art Collective",
    members: 567,
    status: "online",
    role: "moderator",
    color: "from-purple-500 to-pink-500",
    quests: 15,
    xp: 28930,
  },
  {
    name: "Study Group",
    members: 234,
    status: "away",
    role: "member",
    color: "from-orange-500 to-red-500",
    quests: 6,
    xp: 15670,
  },
];

const getRoleIcon = (role: string) => {
  switch (role) {
    case "owner":
      return Crown;
    case "admin":
      return Shield;
    case "moderator":
      return Settings;
    default:
      return Users;
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case "owner":
      return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
    case "admin":
      return "text-red-400 bg-red-500/20 border-red-500/30";
    case "moderator":
      return "text-blue-400 bg-blue-500/20 border-blue-500/30";
    default:
      return "text-gray-400 bg-gray-500/20 border-gray-500/30";
  }
};

export const ServerManagement = ({ onServerSelect }: ServerManagementProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Server Management</h1>
          <p className="text-gray-400">Manage your Discord communities and their quest systems</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/25">
          <Plus className="w-4 h-4 mr-2" />
          Connect Server
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servers.map((server, index) => {
          const RoleIcon = getRoleIcon(server.role);
          
          return (
            <Card 
              key={index} 
              className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              onClick={() => onServerSelect(server.name)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${server.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Server className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{server.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span className="text-gray-400 text-sm capitalize">{server.status}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getRoleColor(server.role)}>
                    <RoleIcon className="w-3 h-3 mr-1" />
                    {server.role}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{server.members.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">{server.quests}</p>
                    <p className="text-gray-400 text-sm">Active Quests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">{server.xp.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Total XP</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      onServerSelect(server.name);
                    }}
                  >
                    Manage
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
