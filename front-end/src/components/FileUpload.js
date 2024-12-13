import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    // Check file extension
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (!['pcap', 'cap', 'pcapng'].includes(fileExtension)) {
        setError('Please upload a valid PCAP, CAP, or PCAPNG file.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected. Please choose a file.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('pcap', file);

    try {
      const response = await fetch('https://network-traffic-analysis.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      onUpload(data);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setError(`Error uploading file: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept=".pcap,.cap,.pcapng"
        disabled={loading}
      />
      <button 
        onClick={handleUpload} 
        disabled={loading || !file}
      >
        {loading ? 'Uploading...' : 'Upload and Analyze'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FileUpload;
