import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { 
  Crown, 
  Users, 
  Shield, 
  Star,
  ArrowRight,
  Settings,
  Trophy,
  Target,
  Sparkles
} from "lucide-react";

const PortalSelection = () => {
  const navigate = useNavigate();
  // If portal selection is already done, redirect immediately
  React.useEffect(() => {
    if (localStorage.getItem("portalSelectionDone")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  const [selectedPortal, setSelectedPortal] = useState<"admin" | "member" | null>(null);

  const portals = [
    {
      id: "admin" as const,
      title: "Admin Portal",
      subtitle: "Server Management & Control",
      description: "Access powerful tools to create events, manage tasks, configure ranks, and design custom reward systems for your Discord community.",
      icon: Crown,
      gradient: "from-purple-600 to-pink-600",
      shadowColor: "shadow-purple-500/25",
      features: [
        "Create & Manage Events",
        "Design Custom Tasks",
        "Configure Rank Systems",
        "Setup Reward Programs",
        "Analytics & Insights"
      ],
      route: "/admin"
    },
    {
      id: "member" as const,
      title: "Member Portal",
      subtitle: "Quest & Achievement Hub",
      description: "Complete tasks, earn experience points, climb leaderboards, and redeem rewards in your community's gamified ecosystem.",
      icon: Users,
      gradient: "from-blue-600 to-emerald-600",
      shadowColor: "shadow-blue-500/25",
      features: [
        "Complete Tasks & Quests",
        "Track Progress & XP",
        "View Leaderboards",
        "Redeem Rewards",
        "Customize Profile"
      ],
      route: "/member"
    }
  ];

  const handlePortalSelect = (portalId: "admin" | "member") => {
    setSelectedPortal(portalId);
    localStorage.setItem("portalSelectionDone", "true");
    const portal = portals.find(p => p.id === portalId);
    if (portal) {
      setTimeout(() => {
        navigate(portal.route);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Guildora</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-green-600/20 text-green-300 border-green-500/30 backdrop-blur-sm">
            <Shield className="w-4 h-4 mr-2" />
            Connected to Discord
          </Badge>
        </div>
      </header>

      {/* Portal Selection */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Choose Your Path
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {" "}Guildora
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Select your portal to access the features designed for your role. You can always switch between portals later.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {portals.map((portal) => (
            <Card 
              key={portal.id}
              className={`group relative bg-white/5 border-white/10 backdrop-blur-xl p-8 transition-all duration-500 cursor-pointer
                ${selectedPortal === portal.id 
                  ? 'scale-105 bg-white/10 border-purple-500/30 shadow-2xl shadow-purple-500/20' 
                  : 'hover:bg-white/8 hover:scale-102 hover:shadow-xl hover:shadow-purple-500/10'
                }
              `}
              onClick={() => handlePortalSelect(portal.id)}
            >
              {/* Selection indicator */}
              {selectedPortal === portal.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white animate-pulse" />
                  </div>
                </div>
              )}

              {/* Portal Icon */}
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${portal.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${portal.shadowColor} shadow-2xl`}>
                <portal.icon className="w-10 h-10 text-white" />
              </div>

              {/* Portal Info */}
              <h3 className="text-3xl font-bold text-white mb-2">{portal.title}</h3>
              <p className={`text-lg font-medium mb-4 bg-gradient-to-r ${portal.gradient} bg-clip-text text-transparent`}>
                {portal.subtitle}
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                {portal.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {portal.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${portal.gradient}`} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <Button 
                className={`w-full bg-gradient-to-r ${portal.gradient} hover:opacity-90 text-white border-0 ${portal.shadowColor} shadow-xl py-6 text-lg font-medium group-hover:shadow-2xl transition-all duration-300`}
                disabled={selectedPortal !== null}
              >
                {selectedPortal === portal.id ? (
                  <>
                    <Star className="w-5 h-5 mr-2 animate-spin" />
                    Entering Portal...
                  </>
                ) : (
                  <>
                    <Settings className="w-5 h-5 mr-2" />
                    Enter {portal.title}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            Need help deciding? Both portals work together to create amazing community experiences.
          </p>
          <Button 
            variant="outline" 
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Learn More About Features
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortalSelection;