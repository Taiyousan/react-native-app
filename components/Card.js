import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';

const Card = ({ pokemon, id }) => {

    const styles = StyleSheet.create({
        card: {
            padding: 10,
            fontSize: 18,
            backgroundColor: '#fafafa',
            borderColor: '#000000',
            borderWidth: 1,
            borderRadius: 5,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            margin: 10,
        },
        img: {
            width: 100,
            height: 100,
        },
    });

    return (
        <View style={styles.card}>
            <Text >{pokemon.name}</Text>
            <Image
                style={styles.img}
                source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
            />
        </View>
    );
};

export default Card;
