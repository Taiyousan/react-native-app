import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { Suspense } from 'react';
import { colors } from '../utils/StylesSheet';



// Component

const Details = ({ route, navigation }) => {
    const { id, type1, type2, height, weight } = route.params;
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true); // initialisez à true


    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            flex: 1,
            // backgroundColor: pokemon.color.name,
        },
        generalInfos: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            margin: 10,
            padding: 10,
            borderRadius: 10,
            gap: 10,
        },
        title: {
            fontSize: 15,
            textAlign: 'center',
            fontWeight: '500',
            margin: 10,
            color: '#252525',
            marginTop: 30,
        },
        textContainer: {
            borderWidth: .2,
            borderColor: '#252525',
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            textAlign: 'justify',
        },
        line: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        name: {
            fontSize: 18,
            fontWeight: '500',
            textTransform: 'capitalize',
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
        imgContainer: {
            // width: '100%',
            height: '50%',
            resizeMode: 'contain',
            borderWidth: 0,
            borderColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
        },
        img: {
            width: 200,
            backgroundColor: '#f2f2f2',
            borderRadius: 100,
            height: 200,
            resizeMode: 'contain',
            borderWidth: 0,
            borderColor: 'red',
        },
    });

    // get API
    const getPokemonDetail = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            setPokemon(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // mettez à jour l'état loading une fois la requête terminée
        }
    };

    useEffect(() => {
        getPokemonDetail();
    }, []);


    function getEnglishGenus(genera) {
        console.log(genera);
        // const englishGenus = genera.find((genus) => genus.language.name === "en");
        // return englishGenus ? englishGenus.genus : "";
    }

    function formatText(text) {
        return text.replace(/\n/g, " ");
    }




    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={[styles.container, colors[type1]]}>

            {/* Image */}
            <View style={styles.imgContainer}
            >
                <Image
                    style={styles.img}
                    source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }}
                />
            </View>
            {/* Infos */}
            <View style={styles.generalInfos}>
                <View style={styles.line}>
                    <Text style={styles.name}>{pokemon.name}</Text>
                    <Text style={styles.order}>#{pokemon.order}</Text>
                </View>
                <View style={styles.line}>
                    <Text>{pokemon.genera[7].genus}</Text>
                </View>
                <View style={styles.types}>
                    <Text style={[styles.type, colors[type1]]}>{type1}</Text>
                    <Text style={[styles.type, colors[type2]]}>{type2}</Text>
                </View>
            </View>

            {/* Caractéristiques */}
            <Text style={styles.title}>Espèces</Text>
            <View style={styles.generalInfos}>
                <Text style={styles.textContainer}>{formatText(pokemon.flavor_text_entries[0].flavor_text)}</Text>
                <View style={styles.line}>
                    <Text>Taille : {height}</Text>
                    <Text>Poids : {weight}</Text>
                </View>
            </View>

        </View>
    );
};

export default Details;
