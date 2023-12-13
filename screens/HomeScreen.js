import React from 'react';
import { Image, View, Text, StyleSheet, ScrollView } from 'react-native';
import ImageCarousel from '../Components/ImageCarousel';
import { WebView } from 'react-native-webview';

// Base class for common styling and functionality
class BaseScreen extends React.Component {
  render() {
    return (
      // ScrollView to enable scrolling for the content
      <ScrollView style={styles.container}>
        {/* Top container for rendering the welcome message */}
        <View style={styles.topContainer}>
          {this.renderWelcome()}
        </View>
        {/* Component for displaying an image carousel */}
        <ImageCarousel />
        {/* Main container for rendering additional content */}
        <View style={styles.mainContainer}>
          {this.renderContent()}
        </View>
        {/* Component for rendering information about opening times and location */}
        {this.renderBox3()}
      </ScrollView>
    );
  }
}

// HomeScreen class extending the BaseScreen class
class HomeScreen extends BaseScreen {
  // Render welcome message
  renderWelcome() {
    return (
      <View style={styles.box}>
        <Text style={styles.mainTitle}>Welcome!</Text>
      </View>
    );
  }

  // Render news and coming soon content
  renderContent() {
    return (
      <>
        {/* Box for displaying news content */}
        <View style={styles.box2}>
          <Text style={styles.boxTitle}>News</Text>
          <Text style={styles.boxText}>
            Announcement- from Monday 1st, the practice will be closing between 1 pm and 2 pm every Monday for training.
          </Text>
        </View>

        {/* Box for displaying coming soon content */}
        <View style={styles.box2}>
          <Text style={styles.boxTitle}>Coming Soon!</Text>
          <Text style={styles.boxText}>As an important update, we will be adding a sign-in page. </Text>
        </View>
      </>
    );
  }

  // Render information about opening times and location
  renderBox3() {
    return (
      <View style={styles.openingTimesLocationBox}>
        <Text style={styles.boxTitle}>Opening Times & Location</Text>
        <Text style={styles.boxText}>
          Monday - Friday: 9 am - 5 pm
        </Text>
        <Image
          source={require('../assets/blakeneyMap.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />
        <Text >{'\n'}Location: <Text style={{ color: '#388E3C' }}>Blakeney Surgery</Text>, Norfolk, England
        </Text>
      </View>
    );
  }
}

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  mainContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
  },
  box: {
    width: '75%',
    height: 70,
    marginBottom: 16,
    alignSelf: 'center',
    borderBottomColor: '#388E3C',
    borderBottomWidth: 2,
    alignItems: 'center',
    textAlign: 'center',
  },
  box2: {
    width: '45%',
    height: 200,
    backgroundColor: '#E0F7E1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  mainTitle: {
    paddingTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  boxTitle: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 3,
  },
  boxText: {
    fontSize: 13,
    alignItems: 'center',
    padding: 5,
    textAlign: 'center',
  },
  openingTimesLocationBox: {
    width: '90%',
    height: 300,
    backgroundColor: '#E0F7E1',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 10,
    marginTop: 20,
  },
  mapImage: {
    width: '100%',
    height: 130,
    marginTop: 10,
  },
});

export default HomeScreen;
