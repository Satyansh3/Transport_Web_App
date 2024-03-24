import React, { useState } from 'react';

const ImageUploadForm = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null)
  const [processedImageUrl, setProcessedImageUrl] = useState(null)


  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Display the selected image as soon as it's chosen
    const reader = new FileReader();
    reader.onload = () => {
      setOriginalImageUrl(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert("Select an image first.");
      return;
    }

    const formData = new FormData();

    formData.append('image', image);
    // console.log(formData)

    try {
      const response = await fetch('http://localhost:5000/detect-objects', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data)
      // console.log(data.processed_image)
      if(data.processed_image){
        setProcessedImageUrl(`data:image/jpeg;base64,${data.processed_image}`);
      }else{
        console.log("No processed image data received from the server")
        alert("No processed image data received from the server")
      }
      onImageUpload(originalImageUrl, data.processed_image);
    } catch (error) {
      console.log('Error detecting vehicles:', error);
      alert('Error detecting vehicles.');
    }
  };

  return (
    <div className='upload'>
      <h2 className='app'>Object Detection App</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} className='select'/>
      {originalImageUrl && (
        <div className='images'>
          <h3>Original Image</h3>
          <img src={originalImageUrl} alt="Original Image" style={{ maxWidth: '50%', maxHeight: '1000px' }} />
        </div>
      )}
      <button className = 'button' onClick={handleImageUpload}>Detect Objects</button>
      {processedImageUrl && (
        <div className='images'>
          <h3>Processed Image</h3>
          <img src={processedImageUrl} alt="Processed Image" style={{ maxWidth: '50%', maxHeight: '1000px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
