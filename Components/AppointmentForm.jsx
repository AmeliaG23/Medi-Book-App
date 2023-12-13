// AppointmentForm.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system'; // Import FileSystem from Expo

// Array containing different appointment types
const appointmentTypes = [
  'Routine',
  'Referral',
  'Test Results',
  'Sick/Fit Notes',
  'Wellbeing',
  'One-Off',
  'Other',
];

const AppointmentForm = () => {
  // State variables to store form input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();

  // useEffect hook to create a file when the component mounts
  useEffect(() => {
    createFile();
  }, []);

  // Function to create a file using React Native File System (RNFS) library
  const createFile = async () => {
    const path = `${FileSystem.documentDirectory}appointment_data.txt`;

    try {
      const fileInfo = await FileSystem.getInfoAsync(path);
      if (!fileInfo.exists) {
        // Create the file if it doesn't exist
        await FileSystem.writeAsStringAsync(path, '');
      }
    } catch (error) {
      console.error('Error checking or creating file:', error);
    }
  };

  // Functions to handle date picker visibility
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  // Function to handle the selection of an appointment type
  const handleAppointmentTypePress = () => {
    Alert.alert(
      'Select Appointment Type',
      '',
      appointmentTypes.map((type) => ({
        text: type,
        onPress: () => {
          setSelectedAppointmentType(type);
        },
      })),
      { cancelable: true }
    );
  };

  // Function to write form data to a file using Expo's FileSystem
  const writeToFile = async () => {
    const path = `${FileSystem.documentDirectory}appointment_data.txt`;

    const data = `First Name: ${firstName}\n`
      + `Last Name: ${lastName}\n`
      + `Date of Birth: ${dob}\n`
      + `Email: ${email}\n`
      + `Phone Number: ${phoneNumber}\n`
      + `Appointment Type: ${selectedAppointmentType}\n`
      + `Description of Request: ${requestDescription}\n\n`;

    try {
      await FileSystem.writeAsStringAsync(path, data, { append: true });
      Alert.alert('Success', 'Appointment data written to file successfully.');
    } catch (error) {
      console.error('Error writing data to file:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validation
    if (
      !firstName ||
      !lastName ||
      !dob ||
      !email ||
      !phoneNumber ||
      !selectedAppointmentType ||
      !requestDescription
    ) {
      Alert.alert('Warning', 'All fields are required.');

    } else {
      if (!email.includes('@')) {
        Alert.alert('Warning', 'Invalid email address.');

      } else {
        if (!/^\d{11}$/.test(phoneNumber)) {
          Alert.alert('Warning', 'Invalid phone number. It should be 11 digits.');

        } else {
          writeToFile();

          // Clear form fields
          setFirstName('');
          setLastName('');
          setDOB('');
          setEmail('');
          setPhoneNumber('');
          setSelectedAppointmentType('');
          setRequestDescription('');

          Alert.alert(
            'Appointment Request Submitted',
            'Your appointment request has been submitted successfully.'
          );

          // Navigate back to the home screen
          navigation.navigate('Home');
        }
      }
    }
  };

  // Function to handle form cancellation
  const handleCancel = () => {
    Alert.alert(
      'Cancel Appointment Request',
      'Are you sure you want to cancel?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Clear form fields
            setFirstName('');
            setLastName('');
            setDOB('');
            setEmail('');
            setPhoneNumber('');
            setSelectedAppointmentType('');
            setRequestDescription('');

            // Navigate back to the home screen
            navigation.navigate('Home');
          },
        },
      ],
      { cancelable: false }
    );
  };

  // JSX rendering the form
  return (
    <View style={styles.formContainer}>
      {/* Form input fields */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholder="Enter your first name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          placeholder="Enter your last name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Date of Birth:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
          <Text>{dob || 'Select date of birth'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setDOB(date.toISOString().split('T')[0]);
            hideDatePicker();
          }}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Telephone Number:</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          placeholder="Enter your telephone number"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Appointment Type:</Text>
        <TextInput
          style={styles.input}
          value={selectedAppointmentType}
          placeholder="Enter your appointment type"
          onFocus={handleAppointmentTypePress}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description of Request:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={requestDescription}
          onChangeText={(text) => setRequestDescription(text)}
          placeholder="Enter your request description"
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Form submission and cancellation buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the form components
const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#E0F7E1',
    padding: 16,
    width: '100%',
    borderRadius: 8,
    alignSelf: 'center',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  dateInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    padding: 10,
    marginLeft: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
});

export default AppointmentForm;
