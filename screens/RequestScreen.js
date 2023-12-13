import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import AppointmentForm from '../Components/AppointmentForm';

const RequestScreen = () => {
  return (
    // Wrapping the entire component in KeyboardAvoidingView for better input interaction
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.scrollViewContainer}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      {/* ScrollView for scrolling through the content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Container for the main content */}
        <View style={styles.box}>
          {/* Title for the Request An Appointment section */}
          <Text style={styles.boxTextTitle}>Request An Appointment</Text>
          {/* Description for the Request An Appointment section */}
          <Text style={styles.boxText}>
            To request an appointment, please fill out the form below.
            If you experience any issues, please press the more info button at the top right of your screen!
          </Text>
        </View>
        {/* Component for the actual appointment form */}
        <AppointmentForm />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container1: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    height: 130,
    marginBottom: 40,
    alignSelf: 'center',
    borderBottomColor: '#388E3C',
    borderBottomWidth: 2,
    alignItems: 'center',
    textAlign: 'center',
    paddingBottom: 10,
  },
  boxTextTitle: {
    fontSize: 17,
    alignSelf: 'center',
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  boxText: {
    fontSize: 13,
    alignSelf: 'center',
    padding: 5,
    textAlign: 'center',
  },
});

export default RequestScreen;
