"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "@/lib/router-compat";

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}