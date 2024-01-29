import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';



// Component

const Details = ({ route, navigation }) => {
    const { id } = route.params;
    const [pokemon, setPokemon] = useState([]);


    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            flex: 1,
        },
        name: {
            fontSize: 50,
            fontWeight: 'bold',
            color: '#252525',
            width: '100%',
            textAlign: 'center',
            padding: 20,
            textTransform: 'capitalize'
        },
        flexContainer: {
            justifyContent: 'center', // Alignement vertical au centre
            alignItems: 'center',
        },
        order: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#252525',
            textTransform: 'capitalize',
            padding: 10,
            borderRadius: 50,
            height: 50,
            width: 50,
            textAlign: 'center',
        },
    });

    // get API
    const getPokemonDetail = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPokemonDetail();
    }, []);





    return (
        <View style={styles.container}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <View style={styles.flexContainer}><Text style={styles.order} >{pokemon.order}</Text></View>
        </View>
    );
};

export default Details;
