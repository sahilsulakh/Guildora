'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Landing from "@/components/landing/Landing";

const App = () => {
  const router = useRouter();
  
  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    const selectedPortalRoute = localStorage.getItem("selectedPortalRoute");
    
    if (isAuthenticated) {
      if (selectedPortalRoute) {
        router.replace(selectedPortalRoute);
      } else {
        router.replace('/portal-selection');
      }
    }
  }, [router]);

  return <Landing />;
};

export default App;
