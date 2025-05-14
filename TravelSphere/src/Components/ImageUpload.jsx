// ImageUpload.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // store all selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // append each image file
    images.forEach((img) => formData.append('images', img));

    // append title or any other field
    formData.append('title', title);

    try {
      const response = await axios.post('http://localhost:5000/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Uploaded:', response.data);
    } catch (err) {
      console.error('Upload failed:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
