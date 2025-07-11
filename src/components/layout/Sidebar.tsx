import { cn } from "@/lib/utils";
import { 
  Home, 
  Server, 
  CheckSquare, 
  Trophy, 
  User, 
  Settings,
  Zap,
  BarChart3,
  Gift,
  Calendar,
  Star
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  portalType?: "admin" | "member";
}

const adminNavigation = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "servers", label: "Servers", icon: Server },
  { id: "events", label: "Events", icon: Calendar },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "ranks", label: "Ranks", icon: Star },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

const memberNavigation = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "profile", label: "Profile", icon: User },
  { id: "rewards", label: "Rewards", icon: Gift },
];

export const Sidebar = ({ activeView, onViewChange, portalType = "admin" }: SidebarProps) => {
  const navigation = portalType === "admin" ? adminNavigation : memberNavigation;
  
  return (
    <div className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 pointer-events-none" />
      
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Guildora</h1>
            <p className="text-sm text-gray-400">{portalType === "admin" ? "Admin Portal" : "Member Portal"}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-white shadow-lg shadow-purple-500/10 border border-purple-500/30" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 animate-pulse" />
                )}
                <Icon className={cn("w-5 h-5 transition-colors relative z-10", 
                  isActive && "text-purple-400"
                )} />
                <span className="font-medium relative z-10">{item.label}</span>
                {isActive && (
                  <div className="absolute right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
