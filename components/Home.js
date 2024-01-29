import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';


// Components
import Card from './Card';

const Home = ({ navigation }) => {


    const [data, setData] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [nextPage, setNextPage] = useState('');

    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            // flex: 1,
        },
    });

    // get API
    const getLists = async (url) => {
        try {
            // debugger;
            const response = await axios.get(url ? url : 'https://pokeapi.co/api/v2/pokemon');
            setData(response.data);
            setPokemonList(response.data.results);
            setNextPage(response.data.next);
        } catch (error) {
            console.error(error);
        }
    }

    const getNextLists = async () => {
        const response = await axios.get(nextPage);
        setData(response.data);
        setPokemonList([...pokemonList, ...response.data.results]);
        setNextPage(response.data.next);
    };

    useEffect(() => {
        getLists();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                onEndReached={getNextLists}
                data={pokemonList}
                numColumns={2}
                renderItem={({ index }) =>
                    <Card id={index + 1} navigation={navigation} />}
            />
        </View>
    );
};

export default Home;
