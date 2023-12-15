import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

// Components
import Card from './Card';

const Home = () => {
    const [data, setData] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);

    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            flex: 1,
        },
    });

    // get API
    const getLists = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokedex/1');
            setData(response.data);
            setPokemonList(response.data.pokemon_entries);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLists();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={pokemonList}
                numColumns={2}
                renderItem={({ item }) =>
                    <Card pokemon={item.pokemon_species} id={item.entry_number} />}
            />
        </View>
    );
};

export default Home;
