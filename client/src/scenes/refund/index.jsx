import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import Dropzone from 'react-dropzone';

const Refund = () => {
  const userId = useSelector((state) => state.cart.user._id);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message || !image) {
      alert('Please provide a message and an image.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('message', message);
    formData.append('image', image);

    // Example fetch call to send form data to the backend
    try {
      const response = await fetch('http://localhost:3001/api/refund', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Refund request submitted successfully!');
      } else {
        alert('Failed to submit refund request.');
      }
    } catch (error) {
      console.error('Error submitting refund request:', error);
      alert('Error submitting refund request.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 , padding:20}}>
      <Typography variant="h3" gutterBottom>
        Refund Request
      </Typography>
      <Typography variant="h4" gutterBottom>
        Change of mind not applicable
      </Typography>
      <TextField
        label="Message"
        variant="outlined"
        fullWidth
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Dropzone onDrop={handleDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #ccc',
              borderRadius: '4px',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              mb: 2,
            }}
          >
            <input {...getInputProps()} />
            {image ? (
              <Typography>{image.name}</Typography>
            ) : (
              <Typography>Drag 'n' drop an image here, or click to select one</Typography>
            )}
          </Box>
        )}
      </Dropzone>
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Refund;
