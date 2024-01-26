import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAppContext } from "../context/store";



// Component

const Details = ({ }) => {
    const { currentPokemon, setCurrentPokemon } = useAppContext();



    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            flex: 1,
        },
    });

    useEffect(() => { console.log(currentPokemon); }, []);
    const [data, setData] = useState([]);
    // get API
    const getLists = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currentPokemon.name}`);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getLists();
    }, []);


    return (
        <View style={styles.container}>
            <Text>Détails</Text>
            <Text>{data.name}</Text>
            <Text>{data.order}</Text>
        </View>
    );
};

export default Details;
