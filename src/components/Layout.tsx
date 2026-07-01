"use client";
import { ReactNode, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "@/lib/router-compat";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransition from "@/components/PageTransition";
import AnnouncementBar from "@/components/AnnouncementBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Show a brief loader on route change for inner pages
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}