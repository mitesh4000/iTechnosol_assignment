import { motion } from "framer-motion";
import React from "react";

interface CustomIconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="group-hover:opacity-100 transition-opacity duration-200 m-1"
      onClick={onClick}
      type="button"
      style={{ border: "none", background: "transparent", cursor: "pointer" }}
    >
      {children}
    </motion.button>
  );
};

export default CustomIconButton;
