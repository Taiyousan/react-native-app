import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importer useFocusEffect
import axios from 'axios';
import { Suspense } from 'react';
import { colors } from '../utils/StylesSheet';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';






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
        height: 350,
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
        paddingBottom: 250
        // height: 'fit-content',
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
        maxWidth: '70%',
    },
    evolutionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 10,
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: '#000',
    },
});

const Details = ({ route, navigation }) => {
    const { id, type1, type2, height, weight, talent, hiddenTalent, stats } = route.params;
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [evolutionChain, setEvolutionChain] = useState([]);
    const [evolutionChainIds, setEvolutionChainIds] = useState([]);
    const [canAddToTeam, setCanAddToTeam] = useState(true);
    const scrollViewRef = React.useRef();
    // initialisez à true

    // API
    const getPokemonDetail = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            setPokemon(response.data);

            if (response.data.evolution_chain) {
                await getEvolutionChain(response.data.evolution_chain.url);
                // console.log(response.data.evolution_chain.url);
            }
        } catch (error) {
            console.error(error);
        } finally {// mettez à jour l'état loading une fois la requête terminée
            setLoading(false);
        }
    };

    const getEvolutionChain = async (url) => {
        try {
            const response = await axios.get(url);
            const evolutionChain = response.data.chain;
            const speciesIds = [];

            speciesIds.push(getIdFromUrl(evolutionChain.species.url));

            for (const evolveTo of evolutionChain.evolves_to) {
                speciesIds.push(getIdFromUrl(evolveTo.species.url));

                for (const secondEvolveTo of evolveTo.evolves_to) {
                    speciesIds.push(getIdFromUrl(secondEvolveTo.species.url));
                }
            }

            setEvolutionChainIds(speciesIds);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    // functions
    const getIdFromUrl = (url) => {
        const urlParts = url.split("/");
        return urlParts[urlParts.length - 2];
    };

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    function formatText(text) {
        return text.replace(/\n/g, " ");
    }

    // TEAM ----------------------------------------------------------------
    const storeTeam = async (key, newValue) => {
        try {
            const existingValue = await AsyncStorage.getItem(key);
            let updatedValue = [];

            if (existingValue !== null) {
                updatedValue = JSON.parse(existingValue);

                if (updatedValue.length >= 6) {
                    console.error('Erreur de stockage : Le tableau contient déjà 6 valeurs');
                    return;
                }

                if (updatedValue.includes(newValue.toString())) { // Convertir newValue en chaîne de caractères
                    console.error('Erreur de stockage : La valeur existe déjà dans le tableau');
                    return;
                }

                updatedValue.push(newValue.toString()); // Convertir newValue en chaîne de caractères
                setCanAddToTeam(false);
            } else {
                updatedValue = [newValue.toString()]; // Convertir newValue en chaîne de caractères
            }

            await AsyncStorage.setItem(key, JSON.stringify(updatedValue));
        } catch (error) {
            console.error('Erreur de stockage :', error);
        }
    };


    const getTeam = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);

            if (jsonValue === null) {
                return [];
            }
            const team = JSON.parse(jsonValue);
            if (team.includes(id.toString())) {
                console.log('Le Pokémon est déjà dans l\'équipe', id.toString());
                setCanAddToTeam(false);
            } else {
                console.log('Le Pokémon n\'est pas dans l\'équipe', id.toString());
                setCanAddToTeam(true);
            }
            console.log('team', team);
            return team;
        } catch (error) {
            console.error('Erreur de récupération de données :', error);
            return [];
        }
    };

    const removeFromTeam = async (key, valueToRemove) => {
        valueToRemove = valueToRemove.toString(); // Convertir valueToRemove en chaîne de caractères
        try {
            // Récupérer le tableau depuis AsyncStorage en utilisant la clé
            const existingValue = await AsyncStorage.getItem(key);

            // Si la valeur est null, il n'y a rien à retirer
            if (existingValue === null) {
                console.warn('Le tableau est vide. Aucune action n\'a été effectuée.');
                return;
            }

            // Parser la valeur JSON en JavaScript
            let updatedValue = JSON.parse(existingValue);

            // Retirer la valeur spécifique du tableau
            updatedValue = updatedValue.filter(item => item !== valueToRemove);

            // Sauvegarder le tableau mis à jour dans AsyncStorage
            await AsyncStorage.setItem(key, JSON.stringify(updatedValue));
            setCanAddToTeam(true);
        } catch (error) {
            console.error('Erreur de suppression de données :', error);
        }
    };


    useEffect(() => {
        const start = async () => {

            console.log('okokoko');
            await getPokemonDetail();
            scrollToTop();
            getTeam('team');

        };

        start();
        console.log('id', id);
    }, [id]);

    function getEnglishGenus(genera) {
        console.log(genera);
        // const englishGenus = genera.find((genus) => genus.language.name === "en");
        // return englishGenus ? englishGenus.genus : "";
    }



    // clean up
    // const cleanUp = () => {
    //     setPokemon([]);
    //     setEvolutionChain([]);
    //     setEvolutionChainIds([]);
    //     setLoading(true);
    // }
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('blur', () => {
    //         cleanUp();
    //     });

    //     return unsubscribe;
    // }, [navigation]);




    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <ScrollView
            style={[styles.scrollView, colors[type1]]}
            contentContainerStyle={styles.contentContainer}
            ref={scrollViewRef}>

            {/* Ajouter à la team */}
            {canAddToTeam ? (
                <Pressable
                    onPress={() => {
                        storeTeam('team', id);
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Ajouter à l'équipe</Text>
                </Pressable>
            ) : (
                <Pressable
                    onPress={() => {
                        removeFromTeam('team', id);
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Retirer de l'équipe</Text>
                </Pressable>
            )}
            {/* Image */}
            <View style={styles.imgContainer}>
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
                {hiddenTalent && <Text style={styles.label}>{talent.charAt(0).toUpperCase() + hiddenTalent.slice(1)} (talent caché)</Text>}
            </View>

            <Text style={styles.title}>Statistiques</Text>
            <View style={styles.generalInfos}>

                {stats.map((stat, index) => (
                    <StatComponent key={index} item={stat} type1={type1} />
                ))}
            </View>

            <Text style={styles.title}>Chaîne d'évolution</Text>
            <View style={[styles.generalInfos, styles.evolutionsContainer]}>
                {evolutionChainIds.map((id) => (
                    <Card key={id} id={id} navigation={navigation} />
                ))}
            </View>


        </ScrollView >
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
