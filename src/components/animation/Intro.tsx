"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Intro: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500); // intro lasts 2.5s
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-4xl font-bold"
    >
      Welcome to My Portfolio 🚀
    </motion.div>
  );
};

export default Intro;
