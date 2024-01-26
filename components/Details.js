import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';



// Component

const Details = ({ route, navigation }) => {
    const { name, id } = route.params;


    const styles = StyleSheet.create({
        container: {
            margin: 0,
            width: '100%',
            flex: 1,
        },
        name: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'green',
        }
    });

    const [data, setData] = useState([]);
    // get API
    const getLists = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
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
            <Text style={styles.name}>{data.name}</Text>
            <Text>{data.order}</Text>
        </View>
    );
};

export default Details;
