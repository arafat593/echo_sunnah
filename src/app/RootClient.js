"use client";

import { useState, useEffect } from "react";
import HomeClient from "./home/HomeClient";
import SplashScreen from "./splash/splash";

export default function RootClient() {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if the user has already visited in this session
    const visited = sessionStorage.getItem("echo_sunnah_visited");
    if (visited) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem("echo_sunnah_visited", "true");
    setShowSplash(false);
  };

  // For server-side rendering and search crawlers, always render HomeClient first.
  // The splash screen is loaded as an overlay on mount to avoid blocking LCP calculations on the actual page content.
  if (!isMounted) {
    return <HomeClient />;
  }

  return (
    <>
      <HomeClient />
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
    </>
  );
}
