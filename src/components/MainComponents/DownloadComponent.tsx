import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const DownloadComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home-component");
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="flex flex-col items-center justify-center h-screen p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-lg mb-6">
            Thank you for downloading. We hope you enjoy your content!
          </p>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-blue-600  rounded-lg shadow-md text-blue-500 hover:hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DownloadComponent;
