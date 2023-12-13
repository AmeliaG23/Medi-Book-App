// App.js
//imports
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HeaderWithModal from './Components/Header';
import Footer from './Components/Footer'

const App = () => {
  /*Creates the layout for all pages with the same header and footer */
  return (
    <NavigationContainer>
      <HeaderWithModal />
      <Footer />
    </NavigationContainer>
  );
};

//exports default layout
export default App;
