import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import Card from './Card';
import axios from 'axios';

// Components

const Team = ({ navigation }) => {

    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
    });

    // states and variables
    const [team, setTeam] = useState([]);
    const pokemonIds = [1, 2, 3, 4, 5, 6];

    const getTeam = async (ids) => {
        try {
            const requests = ids.map(id =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            );
            const responses = await Promise.all(requests);
            const pokemonDetails = responses.map(response => response.data);
            setTeam(pokemonDetails);
        } catch (error) {
            console.error('Error fetching pokemons:', error);
        }
    };


    useEffect(() => {
        getTeam(pokemonIds);
    }, []);



    return (
        <FlatList
            style={styles.container}
            data={team}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
                <Card key={item.id} id={item.id} navigation={navigation} scale={0.5} />
            )}
        />
    );
};

export default Team;
