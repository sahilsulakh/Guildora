import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import PortalSelection from "./pages/PortalSelection";
import AdminPortal from "./pages/AdminPortal";
import MemberPortal from "./pages/MemberPortal";
import DiscordAuth from "./pages/DiscordAuth";
import DiscordCallback from "./pages/DiscordCallback";
import AdminProfile from "./pages/AdminProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const selectedPortalRoute = localStorage.getItem("selectedPortalRoute");

  const getHomeElement = () => {
    if (isAuthenticated) {
      if (selectedPortalRoute) {
        return <Navigate to={selectedPortalRoute} replace />;
      }
      return <PortalSelection />;
    }
    return <Landing />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={getHomeElement()} />
            <Route path="/portal-selection" element={isAuthenticated ? <PortalSelection /> : <Navigate to="/discord-auth" />} />
            <Route path="/admin" element={isAuthenticated ? <AdminPortal /> : <Navigate to="/discord-auth" />} />
            <Route path="/member" element={isAuthenticated ? <MemberPortal /> : <Navigate to="/discord-auth" />} />
            <Route path="/discord-auth" element={<DiscordAuth />} />
            <Route path="/discord-callback" element={<DiscordCallback />} />
            <Route path="/admin-profile" element={isAuthenticated ? <AdminProfile /> : <Navigate to="/discord-auth" />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
