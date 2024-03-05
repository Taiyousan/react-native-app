import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import Home from './components/Home';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';




const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </>
  );
};

export default App;