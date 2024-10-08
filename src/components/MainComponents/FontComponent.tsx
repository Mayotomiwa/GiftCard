import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaBackward } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { UnsplashImage } from "../../types/UnsplashImage";

const fontOptions = ["Roboto", "Lobster", "Pacifico", "Grey Qo", "Montserrat"];

const FontComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedImage,
    celebrationText,
    personName,
  }: {
    selectedImage?: UnsplashImage;
    celebrationText?: string;
    personName?: string;
  } = location.state || {};

  const [selectedFont, setSelectedFont] = useState<string>("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!selectedImage) {
    return <p>Error: No image selected.</p>;
  }

  const handleDone = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleYes = () => {
    setIsConfirmationModalOpen(false);
    setIsLoading(true);

    // Simulate loading before opening the download modal
    setTimeout(() => {
      setIsLoading(false);
      setIsDownloadModalOpen(true);
    }, 1000); // Simulate a 1-second loading delay
  };

  const handleNo = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDownload = () => {
    setIsLoading(true);

    // Simulate a short delay before downloading
    setTimeout(() => {
      const element = document.getElementById("image-container");
      if (element) {
        domtoimage
          .toBlob(element)
          .then((blob) => {
            saveAs(blob, "celebration_image.png");
            setIsLoading(false);
            setIsDownloadModalOpen(false);
            navigate("/download-component");
          })
          .catch((error) => {
            console.error("Oops, something went wrong!", error);
            setIsLoading(false);
          });
      }
    }, 1000); // Simulate a 1-second loading delay
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="relative flex flex-col items-center justify-center p-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <FaBackward
          className="absolute top-4 left-4 text-4xl p-2 text-white cursor-pointer hover:text-blue-800 transition-colors duration-300"
          onClick={() => window.history.back()}
        />

        <div
          id="image-container"
          className="relative w-full max-w-md aspect-w-4 aspect-h-5 mb-4"
        >
          <img
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description || "Selected Image"}
            className="object-cover w-full h-full rounded-md shadow-lg"
          />
          {celebrationText && (
            <div className="absolute top-0 left-0 right-0 p-4 text-center text-white bg-black bg-opacity-30 rounded-md">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: selectedFont }}
              >
                {celebrationText}
              </h2>
            </div>
          )}
          {personName && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white bg-black bg-opacity-30 rounded-md">
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: selectedFont }}
              >
                {personName}
              </h2>
            </div>
          )}
        </div>

        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">Change Font</h3>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
            {fontOptions.map((font) => (
              <button
                key={font}
                onClick={() => setSelectedFont(font)}
                className={`px-4 py-2 border rounded-lg transition duration-300 ease-in-out ${
                  selectedFont === font
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDone}
            className={`px-6 py-3 ${
              !selectedFont || !celebrationText || !personName
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out"
            }`}
            disabled={!selectedFont || !celebrationText || !personName}
          >
            Done
          </motion.button>
        </div>

        {/* Confirmation Modal */}
        {isConfirmationModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-4">
              <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
              <div className="flex space-x-4">
                <button
                  onClick={handleYes}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                  Yes
                </button>
                <button
                  onClick={handleNo}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center space-x-4 bg-white p-6 rounded-lg shadow-lg">
              <div className="w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
              <p className="text-gray-700">Processing...</p>
            </div>
          </motion.div>
        )}

        {/* Download Modal */}
        {isDownloadModalOpen && !isLoading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-4">
              <h2 className="text-xl font-semibold mb-4">
                Click here to download
              </h2>
              <button
                onClick={handleDownload}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
              >
                Download
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FontComponent;
