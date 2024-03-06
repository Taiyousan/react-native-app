import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importer useFocusEffect
import Card from './Card';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const getIds = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error('Erreur de récupération de données :', error);
            return [];
        }
    };

    const getTeam = async (ids) => {
        try {
            const requests = ids.map(id =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            );
            const responses = await Promise.all(requests);
            const pokemonDetails = responses.map(response => response.data);
            setTeam(pokemonDetails);
        } catch (error) {
            console.error('Erreur lors de la récupération des Pokémon:', error);
        }
    };

    const cleanUp = () => {
        setTeam([]);
    };

    useEffect(() => {
        // Récupérer les IDs depuis la mémoire locale
        getIds('team').then(ids => {
            // Effectuer les requêtes API pour obtenir les détails des Pokémon correspondants
            getTeam(ids);
        });
    }, []);

    useFocusEffect( // Utiliser useFocusEffect pour relancer l'effet à chaque fois que l'écran est focalisé
        React.useCallback(() => {
            getIds('team').then(ids => {
                getTeam(ids);
            });
            return cleanUp; // Nettoyer lorsque l'effet est nettoyé
        }, [])
    );

    return (
        <FlatList
            style={styles.container}
            data={team}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
                <Card key={item.id} id={item.id} navigation={navigation} scale={0.5} />
            )}
        />
    );
};

export default Team;
