import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaBackward } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { UnsplashImage } from "../../types/UnsplashImage";

const TextComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedImage }: { selectedImage?: UnsplashImage } =
    location.state || {};

  const [celebrationText, setCelebrationText] = useState<string>("");
  const [personName, setPersonName] = useState<string>("");

  if (!selectedImage) {
    return <p>Error: No image selected.</p>;
  }

  const handleSubmit = () => {
    navigate("/font-component", {
      state: { selectedImage, celebrationText, personName },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="p-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <FaBackward
          className="absolute top-4 left-4 text-4xl p-2 text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-300"
          onClick={() => window.history.back()}
        />
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-sm aspect-w-4 aspect-h-5">
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || "Selected Image"}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        </div>

        <div className="text-center mb-4">
          <input
            type="text"
            placeholder="Enter Celebration Text"
            value={celebrationText}
            onChange={(e) => setCelebrationText(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md"
          />
        </div>

        <div className="text-center mb-4">
          <input
            type="text"
            placeholder="Enter Name of the Person"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-md hover:border-purple-500"
          />
        </div>

        <div className="flex items-center justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded-md ${
              celebrationText && personName
                ? "bg-white text-blue-500 hover:hover:bg-gray-100 transition duration-300 ease-in-out"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!celebrationText || !personName}
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TextComponent;
