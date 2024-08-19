import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchImages } from "../../data/Data";
import { UnsplashImage } from "../../types/UnsplashImage";

const ImagesComponent: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await fetchImages(4);
      setImages(data);
    } catch (err) {
      setError(`Failed to load images, ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleImageSelect = (id: string) => {
    setSelectedImage(id);
  };

  const handleContinue = () => {
    const selectedImageData = images.find(
      (image) => image.id === selectedImage
    );
    if (selectedImageData) {
      navigate("/text-component", {
        state: { selectedImage: selectedImageData },
      });
    }
  };

  const selectedImageName = images.find((image) => image.id === selectedImage)
    ?.user.name;

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <motion.div
        className="p-4"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center">
          <button
            onClick={loadImages}
            className="mb-10 px-4 py-2 text-gray-900 bg-white border-2 border-blue-500 rounded-md hover:border-blue-900 focus:outline-none flex items-center space-x-2"
            disabled={loading}
          >
            <FaSync className={loading ? "animate-spin" : ""} />
            <span>Refresh Images</span>
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <motion.div
              className="flex flex-wrap gap-4 justify-center"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
              }}
            >
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  className={`w-full sm:w-48 text-center cursor-pointer ${
                    selectedImage === image.id
                      ? "border-4 border-blue-500"
                      : "border-2 border-transparent"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  onClick={() => handleImageSelect(image.id)}
                >
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description || "Unsplash Image"}
                    loading="lazy" // Enable lazy loading
                    className={`w-full h-60 object-cover rounded-md ${
                      selectedImage === image.id ? "opacity-75" : "opacity-100"
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Display selected image's photographer name below the grid */}
            {selectedImageName && (
              <div className="text-center mt-4">
                <p className="text-sm">Selected Image by {selectedImageName}</p>
              </div>
            )}

            <div className="flex items-center justify-center mt-10">
              <button
                className={`px-4 py-2 text-white rounded-md ${
                  selectedImage
                    ? "bg-blue-500 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!selectedImage}
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ImagesComponent;
