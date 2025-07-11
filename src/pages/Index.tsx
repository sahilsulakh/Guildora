
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { ServerManagement } from "@/components/server/ServerManagement";
import { TaskManagement } from "@/components/tasks/TaskManagement";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { UserProfile } from "@/components/profile/UserProfile";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedServer, setSelectedServer] = useState("Community Hub");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardOverview selectedServer={selectedServer} />;
      case "servers":
        return <ServerManagement onServerSelect={setSelectedServer} />;
      case "tasks":
        return <TaskManagement selectedServer={selectedServer} />;
      case "leaderboard":
        return <Leaderboard selectedServer={selectedServer} />;
      case "profile":
        return <UserProfile />;
      default:
        return <DashboardOverview selectedServer={selectedServer} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="flex min-h-screen relative z-10">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
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

export default Index;
