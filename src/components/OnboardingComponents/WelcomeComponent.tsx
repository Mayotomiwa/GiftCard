import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home-component');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-4">Welcome to GiftCard Creator</h1>
        <p className="text-lg mb-8">Create beautiful and personalized gift cards for any occasion.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeComponent;
