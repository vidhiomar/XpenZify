import React, { useState } from 'react';
import axios from 'axios';

const OCRUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // file uploadding & OCR processing..
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first');
      return;
    }
    setError('');
    setResult(null);
    setUploading(true);

    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make sure the backend URL matches your server's endpoint.
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>OCR Document Upload</h1>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={uploading} style={{ marginLeft: '10px' }}>
          {uploading ? 'Uploading...' : 'Upload & Scan'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>Error: {error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>OCR Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OCRUpload;
