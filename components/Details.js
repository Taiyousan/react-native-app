import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { Suspense } from 'react';
import { colors } from '../utils/StylesSheet';



// Styles
const styles = StyleSheet.create({
    container: {
        margin: 0,
        width: '100%',
        flex: 1,
        paddingBottom: 500,
        // backgroundColor: pokemon.color.name,
    },
    generalInfos: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        gap: 10,
        width: '95%',
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
    textCapitalize: {
        textTransform: 'capitalize',
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
    line: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 0,
        borderColor: 'red',
    },
    label: {
        fontSize: 12,
        color: '#252525',
        borderWidth: .2,
        borderColor: 'black',
        padding: 5,
        borderRadius: 2,
        textAlign: 'center',
    },
    scrollView: {
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 150
    },
    stat: {
        flexDirection: 'row',
    },
    statLabel: {
        padding: 5,
        textAlign: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
        textTransform: 'uppercase',
        width: '30%',
        opacity: 0.8,
        color: '#fff',
        fontWeight: 'bold',
    },
    statValue: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 5,
        padding: 5,
        paddingRight: 10,
        textAlign: 'right',
        opacity: 0.9,
        color: '#fff',
    },

});

const Details = ({ route, navigation }) => {
    const { id, type1, type2, height, weight, talent, hiddenTalent, stats } = route.params;
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true); // initialisez à true

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
        <ScrollView style={[styles.scrollView, colors[type1]]}
            contentContainerStyle={styles.contentContainer}>

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
                <Text style={styles.textContainer}>{formatText(pokemon.flavor_text_entries.find(entry => entry.language.name === "fr").flavor_text)}</Text>
                <View style={styles.line}>
                    <Text style={styles.label}>Taille : {height / 10} m</Text>
                    <Text style={styles.label}>Poids : {weight / 10} kg</Text>
                </View>
            </View>


            <Text style={styles.title}>Talents</Text>
            <View style={styles.generalInfos}>
                <Text style={styles.label}>{talent.charAt(0).toUpperCase() + talent.slice(1)}</Text>
                <Text style={styles.label}>{talent.charAt(0).toUpperCase() + hiddenTalent.slice(1)} (talent caché)</Text>
            </View>

            <Text style={styles.title}>Statistiques</Text>
            <View style={styles.generalInfos}>

                {stats.map((stat, index) => (
                    <StatComponent key={index} item={stat} type1={type1} />
                ))}
            </View>


        </ScrollView>
    );
};

const StatComponent = ({ item, type1 }) => (
    <View style={styles.stat}>
        <Text style={[styles.statLabel, colors[type1]]} numberOfLines={1}>{item.stat.name}</Text>
        <Text style={[styles.statValue, colors[type1], { width: (item.base_stat * 0.7) + '%' }]}>
            {item.base_stat}
        </Text>
    </View >
);


export default Details;
