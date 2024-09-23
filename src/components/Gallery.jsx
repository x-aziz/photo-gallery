import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ImageCard from './ImageCard';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get('https://api.unsplash.com/photos?client_id=YOUR_ACCESS_KEY');
      setImages(response.data);
    };
    fetchImages();
  }, []);

  const filteredImages = images.filter(image => 
    image.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <div className="gallery">
        {filteredImages.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
