import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';


const Card = ({ id, navigation }) => {


    const styles = StyleSheet.create({
        card: {
            fontSize: 18,
            backgroundColor: '#fafafa',
            borderColor: 'red',
            borderWidth: 0,
            borderRadius: 5,
            height: 500,
            margin: 20,
            shadowColor: "#000",
            shadowOpacity: 0.18,
            shadowRadius: 1.00,

            elevation: 1,
        },
        infos: {
            paddingLeft: 30,
            gap: 10,
        },
        order: {
            color: 'grey',
        },
        name: {
            fontSize: 20,
            color: '#252525',
            textTransform: 'capitalize',
        },
        img: {
            height: '75%',
            resizeMode: 'contain',
            backgroundColor: '#f2f2f2',
            borderWidth: 0,
            borderColor: 'red',
            marginBottom: 10,
        },
        types: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            width: '100%',
        },
        type: {
            color: '#fff',
            padding: 5,
            borderRadius: 5,
            textTransform: 'capitalize',
            fontSize: 12,
            width: 100,
            textAlign: 'center',
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
                type1: type1,
                type2: type2 ? type2 : null,
                height: pokemon.height,
                weight: pokemon.weight,
                talent: pokemon.abilities[0].ability.name,
                hiddenTalent: pokemon.abilities[1] ? pokemon.abilities[1].ability.name : null,
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
                {/* 
                <Text style={styles.name}>{pokemon.name}</Text>
                <Image
                    style={styles.img}
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
                />
                <View style={styles.types}>
                    <Text style={[styles.type, styles[type1]]}>{type1}</Text>
                    {type2 && <Text style={[styles.type, styles[type2]]}>{type2}</Text>}
                </View> */}
                <Image
                    style={styles.img}
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
                />
                <View style={styles.infos}>
                    <Text style={styles.order}>N° {id}</Text>
                    <Text style={styles.name}>{pokemon.name}</Text>
                    <View style={styles.types}>
                        <Text style={[styles.type, styles[type1]]}>{type1}</Text>
                        {type2 && <Text style={[styles.type, styles[type2]]}>{type2}</Text>}
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>
    );
};

export default Card;
