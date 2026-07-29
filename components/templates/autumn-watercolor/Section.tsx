"use client";

import { motion } from "framer-motion";

export function Section({ 
  id, 
  children, 
  className = "" 
}: { 
  id: string; 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`py-12 px-6 relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}
