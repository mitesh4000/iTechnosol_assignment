import { motion } from "framer-motion";
import type React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-300 to-lime-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 bg-lime-400 p-8 md:p-12 text-white flex flex-col justify-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lime-100 mb-6">{subtitle}</p>
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-lime-300"></div>
            <div className="w-12 h-12 rounded-full bg-lime-200"></div>
            <div className="w-12 h-12 rounded-full bg-lime-100"></div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 p-8 md:p-12"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
