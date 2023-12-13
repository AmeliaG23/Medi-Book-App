import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

// ImageCarousel component for displaying a carousel of images
const ImageCarousel = () => {
  // State to store the fetched images
  const [images, setImages] = useState([]);

  // Function to fetch images from the server
  const fetchImages = async () => {
    try {
      // Fetching images from a JSON file hosted on the local server
      const response = await fetch('http://192.168.1.121:8081/assets/images.json');
      const data = await response.json();
      // Set the fetched images in the state
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // useEffect hook to fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // JSX structure for the ImageCarousel component
  return (
    <View style={styles.container}>
      {/* Swiper component for image carousel */}
      <Swiper
        key={images.length}
        showsButtons={false}
        loop={false}
        style={styles.swiper}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {/* Mapping through fetched images and displaying in the carousel */}
        {images.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item.url }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

// Styles for the ImageCarousel component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  swiper: {
    height: 250,
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'lightgrey',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#388E3C',
    width: 9,
    height: 9,
    borderRadius: 6,
    margin: 3,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
});

// Export the ImageCarousel component
export default ImageCarousel;
