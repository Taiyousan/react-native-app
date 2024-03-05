import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable, Keyboard } from 'react-native';
import axios from 'axios';
import Card from './Card';

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
    });

    const [search, setSearch] = useState('');
    const [resultId, setResultId] = useState(null);


    const searchPokemon = async () => {
        Keyboard.dismiss();
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
            setResultId(response.data.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre recherche..."
                onChangeText={(text) => setSearch(text)} // Fonction de gestion du changement de texte
            />
            <Pressable onPress={searchPokemon} style={styles.button}>
                <Text style={styles.buttonText}>RECHERCHER</Text>
            </Pressable>
            {resultId && <Card id={resultId} navigation={navigation} />}
        </View>
    );
};

export default Search;
