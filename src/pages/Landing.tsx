import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { 
  Crown, 
  Users, 
  Trophy, 
  Zap, 
  Shield, 
  Star,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Target,
  Gift
} from "lucide-react";

const Landing = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Crown,
      title: "Server Management",
      description: "Complete control over your Discord community with advanced admin tools",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Quest System",
      description: "Create engaging tasks and challenges to boost member participation",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description: "Dynamic rankings and competitive elements that drive engagement",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Gift,
      title: "Reward System",
      description: "Custom rewards, badges, and perks to recognize member contributions",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { label: "Active Communities", value: "2,500+", icon: Users },
    { label: "Quests Completed", value: "250K+", icon: Target },
    { label: "Rewards Earned", value: "1M+", icon: Gift },
    { label: "Happy Members", value: "100K+", icon: Star }
  ];

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
        
        <Button 
          variant="outline" 
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          onClick={() => window.location.href = '/discord-auth'}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Login with Discord
        </Button>
      </header>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Next-Gen Discord Companion
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {" "}Discord{" "}
            </span>
            Community
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate gamified platform that brings structure, engagement, and rewards to your Discord server. 
            Create quests, manage tasks, track progress, and build thriving communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl shadow-purple-500/25 px-8 py-6 text-lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => window.location.href = '/discord-auth'}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Connect Discord Server
              <ArrowRight className={`w-5 h-5 ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-xl p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Gamify{" "}
            </span>
            Your Server
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Powerful tools designed to transform passive Discord members into active, engaged community participants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group bg-white/5 border-white/10 backdrop-blur-xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-br from-indigo-200/80 via-purple-400/80 to-pink-300/80 border-2 border-purple-500/40 shadow-2xl backdrop-blur-2xl p-14 text-center rounded-2xl">
          <Shield className="w-16 h-16 mx-auto mb-6 text-purple-500 drop-shadow-lg" />
          <h3 className="text-4xl font-extrabold mb-4 text-indigo-900 drop-shadow-2xl tracking-tight" style={{textShadow: '0 4px 24px #c4b5fd, 0 1px 0 #fff'}}>Ready to Level Up Your Community?</h3>
          <p className="text-xl font-semibold text-purple-800 mb-8 max-w-2xl mx-auto drop-shadow-lg" style={{textShadow: '0 2px 8px #c4b5fd, 0 1px 0 #fff'}}>Join thousands of Discord communities that have transformed their servers with <span className='text-pink-500 font-bold'>Guildora</span>.</p>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white font-extrabold border-0 shadow-2xl shadow-pink-500/30 px-14 py-7 text-xl rounded-xl transition-all duration-200 focus:ring-4 focus:ring-pink-400 flex items-center justify-center gap-3"
            >
              <Zap className="w-6 h-6 mr-2" />
              Get Started Free
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Landing;