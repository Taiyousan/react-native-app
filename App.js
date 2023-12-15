import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import Home from './components/Home';
import Navbar from './components/Navbar';



const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
      <Navbar />
      <Home />
    </>
  );
};

export default App;