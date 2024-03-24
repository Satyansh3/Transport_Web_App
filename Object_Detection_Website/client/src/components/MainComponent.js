// MainComponent.js
import React, { useState } from "react";
import Navigation from "./Navigation";
import ImageUploadForm from "./ImageUploadForm";

const MainComponent = () => {
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [processedImageUrl, setProcessedImageUrl] = useState("");
  const [numVehicles, setNumVehicles] = useState(null);

  const handleImageUpload = (originalImageUrl, processedImageUrl, numVehicles) => {
    setOriginalImageUrl(originalImageUrl);
    setProcessedImageUrl(processedImageUrl);
    setNumVehicles(numVehicles);
    // console.log("processed image url", processedImageUrl)
  };

  return (
    <main>
      <Navigation />
      <ImageUploadForm onImageUpload={handleImageUpload} />
    </main>
  );
};

export default MainComponent;
