// src/components/Upload.js
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [abstract, setAbstract] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('abstract', abstract);
    formData.append('tags', tags);
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/articles/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        }
      });
      window.location.href = "/"; // Redirect to home page
    } catch (error) {
      console.error("Error uploading article: ", error);
    }
  };

  return (
    <div>
      <h2>Upload Article</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
        <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} placeholder="Abstract" required></textarea>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma-separated)" required />
        <input type="file" onChange={handleImageChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
