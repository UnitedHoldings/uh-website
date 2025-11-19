import { motion } from 'framer-motion';
import { FaShieldAlt, FaHandshake, FaGlobeAfrica } from 'react-icons/fa';

const iconMap = {
  FaShieldAlt,
  FaHandshake,
  FaGlobeAfrica
};

const ReasonCard = ({ title, content, icon, gradient, accentColor, index }) => {
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-black/20 overflow-hidden transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -10 }}
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      {/* Accent Bar */}
      <div 
        className="absolute top-0 left-0 w-2 h-full transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10 bg-white/40 rounded-2xl p-6 duration-300">
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="text-5xl font-bold text-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
          {IconComponent && (
            <div className="w-12 h-12 bg-[#9b1c20] rounded-xl flex items-center justify-center">
              <IconComponent className="text-white text-xl" />
            </div>
          )}
        </div>

        <h3 className="text-2xl h-16 font-bold text-gray-900 mb-4 font-outfit leading-tight">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-lg font-light">
          {content}
        </p>

        {/* Hover Effect Line */}
        <div 
          className="absolute bottom-0 left-8 w-24 h-1 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </motion.div>
  );
};

export default ReasonCard;