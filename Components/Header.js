// HeaderWithModal.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MoreInfoModal from '../Components/MoreInfoModal';

// HeaderWithModal component containing a logo, more info button, and a modal
const HeaderWithModal = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to toggle the visibility of the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to navigate to the home screen
  const navigateToHome = () => {
    navigation.navigate('Home'); // Replace 'Home' with the actual name of your home screen
  };

  // JSX structure for the HeaderWithModal component
  return (
    <View>
      {/* Header section with logo and more info button */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {/* TouchableOpacity for navigating to the home screen on logo press */}
          <TouchableOpacity onPress={navigateToHome}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
        {/* TouchableOpacity for opening the MoreInfoModal */}
        <TouchableOpacity style={styles.moreInfoButton} onPress={toggleModal}>
          <FontAwesome name="info-circle" size={24} color="#388E3C" />
        </TouchableOpacity>
      </View>

      {/* MoreInfoModal component, conditionally rendered based on modal visibility */}
      <MoreInfoModal isVisible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};

// Styles for the HeaderWithModal component
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 6,
  },
  logo: {
    width: 130,
    height: 80,
  },
  logoContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  moreInfoButton: {
    paddingTop: 20,
    borderRadius: 8,
  },
});

// Export the HeaderWithModal component
export default HeaderWithModal;
