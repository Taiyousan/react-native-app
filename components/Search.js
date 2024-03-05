import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable, Keyboard, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';

const Search = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            margin: 20,
        },
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
        },
        button: {
            height: 40,
            backgroundColor: '#252525', // Couleur de fond du bouton
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            color: 'white',
            display: 'flex',
            textAlign: 'center',
        },
        buttonText: {
            color: 'white',
        },
        errorContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: "40%",
        },
        error: {
            color: 'red',
        },
    });

    const [search, setSearch] = useState('');
    const [resultId, setResultId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);



    const searchPokemon = async () => {
        setResultId(null);
        setIsLoading(true);
        setIsError(false);
        Keyboard.dismiss();
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
            setResultId(response.data.id);
        } catch (error) {
            console.error(error);
            setResultId(null); // Réinitialiser le résultat
            setIsError(true);
        } finally {
            setSearch(''); // Réinitialiser le champ de recherche
            setIsLoading(false); // Mettre fin au chargement
        }
    };


    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setResultId(null);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre recherche..."
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
            <Pressable onPress={searchPokemon} style={styles.button}>
                <Text style={styles.buttonText}>RECHERCHER</Text>
            </Pressable>
            {isLoading && <LoadingSpinner />}
            {resultId ? <Card id={resultId} navigation={navigation} scale={0.8} /> : null}
            {!isLoading && !resultId && isError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.error}>Le Pokémon n'existe pas.</Text>
                </View>
            )}
        </View>

    );
};

export default Search;
