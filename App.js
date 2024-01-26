import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import Home from './components/Home';
import Navbar from './components/Navbar';
import Navigation from './components/Navigation';
import { AppContextProvider } from "./context/store";




const App = () => {
  return (
    <>
      <AppContextProvider>
        <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
        {/* <Navbar />
      <Home /> */}
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AppContextProvider>
    </>
  );
};

export default App;