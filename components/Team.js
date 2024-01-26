import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

// Components

const Team = () => {

    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            flex: 1,
        },
    });


    return (
        <View style={styles.container}>
            <Text>Équipe</Text>
        </View>
    );
};

export default Team;
