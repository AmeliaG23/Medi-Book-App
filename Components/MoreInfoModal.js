import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the appropriate icon from the library

// MoreInfoModal component for displaying additional help information
const MoreInfoModal = ({ isVisible, onClose }) => {

  // Function to handle pressing the email icon
  const handleEmailPress = async () => {
    const email = 'support@blakeneySurgery.com';
    const subject = 'Help with Blakeney Surgery App';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    try {
      await Linking.openURL(mailtoLink);
    } catch (error) {
      console.error('Error opening email client:', error);
    }
  };

  // Function to handle pressing the phone icon
  const handlePhonePress = async () => {
    const phoneNumber = 'tel:01263765245';
    const canOpen = await Linking.canOpenURL(phoneNumber);

    if (canOpen) {
      try {
        await Linking.openURL(phoneNumber);
      } catch (error) {
        console.error('Error making phone call:', error);
      }
    } else {
      console.error('Cannot open phone app');
    }
  };

  // JSX structure for the modal content
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Title of the modal */}
          <Text style={styles.modalTitle}>Help:</Text>
          {/* Explanation text */}
          <Text style={styles.modalText}>
            If you're stuck with the app, please contact us for assistance:
          </Text>
          {/* Display email contact information */}
          <Text style={styles.contactInfo}>Email: support@blakeneySurgery.com</Text>
          {/* Email icon with onPress functionality */}
          <TouchableOpacity onPress={handleEmailPress} style={styles.iconContainer}>
            <Icon name="envelope" size={25} color="#388E3C" />
          </TouchableOpacity>
          {/* Display phone contact information */}
          <Text style={styles.contactInfo}>Phone: 01263 765245</Text>
          {/* Phone icon with onPress functionality */}
          <TouchableOpacity onPress={handlePhonePress} style={styles.iconContainer}>
            <Icon name="phone" size={25} color="#388E3C" />
          </TouchableOpacity>
          {/* Close button with onPress functionality */}
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: '#388E3C', marginTop: 10 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles for the MoreInfoModal component
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  contactInfo: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  iconContainer: {
    paddingBottom: 10,
  },
});

// Export the MoreInfoModal component
export default MoreInfoModal;
