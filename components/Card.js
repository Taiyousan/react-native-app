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
            height: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flex: 1,
            margin: 10,
            shadowColor: "#000",
            shadowOpacity: 0.18,
            shadowRadius: 1.00,

            elevation: 1,
        },
        order: {
            position: 'absolute',
            top: 0,
            left: 0,
            fontSize: 10,
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#252525',
            padding: 10,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
        },
        name: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#252525',
            width: '100%',
            textAlign: 'center',
            padding: 20,
            textTransform: 'capitalize'
        },
        img: {
            width: 100,
            height: 100,
        },
        types: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        type: {
            color: '#fff',
            padding: 5,
            borderRadius: 5,
            textTransform: 'capitalize',
        },
        grass: {
            backgroundColor: '#78C850',
        },
        fire: {
            backgroundColor: '#F08030',
        },
        water: {
            backgroundColor: '#6890F0',
        },
        bug: {
            backgroundColor: '#A8B820',
        },
        normal: {
            backgroundColor: '#A8A878',
        },
        poison: {
            backgroundColor: '#A040A0',
        },
        electric: {
            backgroundColor: '#F8D030',
        },
        ground: {
            backgroundColor: '#E0C068',
        },
        fairy: {
            backgroundColor: '#EE99AC',
        },
        fighting: {
            backgroundColor: '#C03028',
        },
        psychic: {
            backgroundColor: '#F85888',
        },
        rock: {
            backgroundColor: '#B8A038',
        },
        ghost: {
            backgroundColor: '#705898',
        },
        ice: {
            backgroundColor: '#98D8D8',
        },
        dragon: {
            backgroundColor: '#7038F8',
        },
        dark: {
            backgroundColor: '#705848',
        },
        steel: {
            backgroundColor: '#B8B8D0',
        },
        flying: {
            backgroundColor: '#A890F0',
        }
    });

    // states
    const [pokemon, setPokemon] = useState([]);
    const [type1, setType1] = useState(null);
    const [type2, setType2] = useState(null);

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
            setType1(response.data.types[0].type.name);
            if (response.data.types[1]) {
                setType2(response.data.types[1].type.name);
            }
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
                <Text style={styles.order}>{id}</Text>
                <Text style={styles.name}>{pokemon.name}</Text>
                <Image
                    style={styles.img}
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
                />
                <View style={styles.types}>
                    <Text style={[styles.type, styles[type1]]}>{type1}</Text>
                    {type2 && <Text style={[styles.type, styles[type2]]}>{type2}</Text>}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Card;
