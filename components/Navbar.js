import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';

const Home = () => {

    const styles = StyleSheet.create({
        container: {
            height: 100,
            width: '100%',
            backgroundColor: "#f0f0f0",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
        },
        img: {
            width: 50,
            height: 50,
        }
    });

    return (
        <View style={styles.container}>
            <Image source={require('../assets/honor-ball.png')} style={styles.img} />
        </View>
    );
};

export default Home;
