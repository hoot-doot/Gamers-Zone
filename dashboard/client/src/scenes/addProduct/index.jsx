import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Dropzone from 'react-dropzone';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [price, setPrice] = useState('');
    const [picturePath, setPicturePath] = useState([]);
    const [category, setCategory] = useState([]);
    const [platform, setPlatform] = useState([]);
    const [rating, setRating] = useState('');
    const [creator, setCreator] = useState('');
    const [isGame, setIsGame] = useState(true);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('shortDescription', shortDescription);
      formData.append('longDescription', longDescription);
      formData.append('price', price);
      picturePath.forEach((file) => {
        formData.append('picturePath', file);
      });
      formData.append('category', JSON.stringify(category)); 
  formData.append('platform', JSON.stringify(platform)); 
      formData.append('rating', rating);
      formData.append('creator', creator);
      console.log(picturePath);
  
      try {
        const response = await fetch('http://localhost:5001/api/products', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('Product added successfully');
          // Reset form fields
          setName('');
          setShortDescription('');
          setLongDescription('');
          setPrice('');
          setPicturePath([]);
          setCategory([]);
          setPlatform([]);
          setRating('');
          setCreator('');
        } else {
          console.error('Error adding product:', response.status);
        }
      } catch (err) {
        console.error('Error adding product:', err);
      }
    };
    
    const handleDrop = (acceptedFiles) => {
      setPicturePath(acceptedFiles);
    };
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Short Description"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Long Description"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              type="number"
            />
          </Grid>
          <Grid item xs={12} >
          <Box
                  gridRow="span 4"
                  border={`1px solid white`}
                  borderRadius="5px"
                  p="1rem"
                >
          <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Typography>Drag and drop files, or click to select files</Typography>
                </div>
              )}
            </Dropzone>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                multiple
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                <MenuItem value="Simulation">Simulation</MenuItem>
                <MenuItem value="Strategy">Strategy</MenuItem>
                <MenuItem value="Mouse">Mouse</MenuItem>
                <MenuItem value="Gaming">Gaming</MenuItem>
                <MenuItem value="Action">Action</MenuItem>
                <MenuItem value="Headset">Headset</MenuItem>
                <MenuItem value="Keyboard">Keyboard</MenuItem>
                <MenuItem value="RPG">Adventure</MenuItem>
                <MenuItem value="Open World">Open World</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {isGame && (
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Platform</InputLabel>
                <Select
                  multiple
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="PC">PC</MenuItem>
                  <MenuItem value="Xbox">Xbox</MenuItem>
                  <MenuItem value="Nintendo Switch">Nintendo Switch</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={2}>
            <TextField
              label="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              fullWidth
              required
              type="number"
              inputProps={{ min: 1, max: 5 }}
            />
          </Grid>
          {isGame && (
            <Grid item xs={12}>
              <TextField
                label="Creator"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Product Type</InputLabel>
              <Select
                value={isGame ? 'game' : 'accessory'}
                onChange={(e) => setIsGame(e.target.value === 'game')}
              >
                <MenuItem value="game">Game</MenuItem>
                <MenuItem value="accessory">Accessory</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddProduct;