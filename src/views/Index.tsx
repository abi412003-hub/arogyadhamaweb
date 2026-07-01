"use client";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import QuickActions from "@/components/QuickActions";
import AboutSection from "@/components/AboutSection";
import TherapiesSection from "@/components/TherapiesSection";
import DepartmentsSection from "@/components/DepartmentsSection";
import ConditionNavigator from "@/components/ConditionNavigator";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NotableVisitors from "@/components/NotableVisitors";
import DailyLifeSection from "@/components/DailyLifeSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import ResearchSection from "@/components/ResearchSection";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  return (
    <Layout>
      <main>
        <HeroSection />
        <QuickActions />
        <AboutSection />
        <TherapiesSection />
        <DepartmentsSection />
        <ConditionNavigator />
        <StatsSection />
        <TestimonialsSection />
        <NotableVisitors />
        <DailyLifeSection />
        <FacilitiesSection />
        <ResearchSection />
        <NewsletterSection />
      </main>
    </Layout>
  );
};

export default Index;