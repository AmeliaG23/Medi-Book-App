// If I was to include SQLite within my project.
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SQLite from 'react-native-sqlite-storage';



SQLite.DEBUG(true);
SQLite.enablePromise(true);

const db = SQLite.openDatabase({
  name: 'AppointmentDatabase.db',
  location: 'default',
},
  () => { console.log(error) }
);




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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const openDatabase = async () => {
      try {
        const dbInstance = await SQLite.openDatabase({
          name: 'AppointmentDatabase.db',
          location: 'default',
        });
        setDb(dbInstance);
        createDatabase(dbInstance);
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };

    openDatabase();
  }, []);



  const createDatabase = (database) => {
    database.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, dob TEXT, email TEXT, phoneNumber TEXT, selectedAppointmentType TEXT, requestDescription TEXT);'
      );
    });
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

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
          try {
            if (!db) {
              console.error('Database not initialized.');
              return;
            }

            await db.transaction(async (tx) => {
              tx.executeSql(
                'INSERT INTO appointments (firstName, lastName, dob, email, phoneNumber, selectedAppointmentType, requestDescription) VALUES (?, ?, ?, ?, ?, ?, ?);',
                [
                  firstName,
                  lastName,
                  dob,
                  email,
                  phoneNumber,
                  selectedAppointmentType,
                  requestDescription,
                ],
              );
            });

            Alert.alert(
              'Success',
              'Appointment request submitted successfully.'
            );
          } catch (error) {
            console.error('Error saving data to SQLite:', error);
            Alert.alert('Error', 'Failed to submit appointment request.');
          }
        }
      }
    }







    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'INSERT INTO appointments (firstName, lastName, dob, email, phoneNumber, selectedAppointmentType, requestDescription) VALUES (?, ?, ?, ?, ?, ?, ?);',
    //     [
    //       firstName,
    //       lastName,
    //       dob,
    //       email,
    //       phoneNumber,
    //       selectedAppointmentType,
    //       requestDescription,
    //     ],
    //     (_, results) => {
    //       console.log('Results of executeSql:', results);

    //       if (results.rowsAffected > 0) {
    //         console.log('Appointment data saved to SQLite');
    //         Alert.alert(
    //           'Success',
    //           'Appointment request submitted successfully.'
    //         );
    //       } else {
    //         console.error('Error saving data to SQLite: No rows affected');
    //         Alert.alert('Error', 'Failed to submit appointment request.');
    //       }
    //     },
    //     (_, error) => {
    //       console.error('Error saving data to SQLite:', error);
    //       Alert.alert('Error', 'Failed to submit appointment request.');
    //     }
    //   );
    // },
    //   (error) => {
    //     console.error('Transaction error:', error);
    //   },
    //   () => {
    //     console.log('Transaction successful');
    //   }
    // );
  };

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

  return (
    <View style={styles.formContainer}>
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
