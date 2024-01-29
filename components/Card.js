import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';


const Card = ({ id, navigation }) => {


    const styles = StyleSheet.create({
        card: {
            padding: 10,
            fontSize: 18,
            backgroundColor: '#fafafa',
            borderColor: '#000000',
            borderWidth: 0,
            borderRadius: 5,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            margin: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,

            elevation: 1,
        },
        img: {
            width: 100,
            height: 100,
        },
    });

    // states
    const [pokemon, setPokemon] = useState([]);

    const handleCardClick = () => {
        // setCurrentPokemon(pokemon);
        navigation.navigate('Accueil-Detail',
            {
                id: id,
            })
    };

    // get API
    const getPokemon = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPokemon();
    }, []);


    return (
        <TouchableWithoutFeedback onPress={handleCardClick}>
            <View style={styles.card}>
                <Text>{pokemon.name}</Text>
                <Image
                    style={styles.img}
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Card;
