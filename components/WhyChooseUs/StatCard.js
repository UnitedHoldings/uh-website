import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const StatCard = ({ value, label, sublabel, color, index }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = parseInt(value.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const steps = 60;
    const step = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      className="text-center group"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative inline-block">
        <div className={`text-5xl sm:text-6xl font-bold ${color} mb-3 relative z-10`}>
          {value.includes('+') || value.includes('%') ? `${count}${value.replace(/[0-9]/g, '')}` : count}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent blur-xl rounded-full transform scale-150 group-hover:scale-200 transition-transform duration-500" />
      </div>
      <div className={`text-lg font-semibold ${color} mb-1`}>{label}</div>
      <div className="text-sm text-white/80 font-light">{sublabel}</div>
    </motion.div>
  );
};

export default StatCard;