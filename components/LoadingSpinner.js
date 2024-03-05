import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingSpinner = () => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            marginTop: 200,
        },
        horizontal: {
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10
        }
    });
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="grey" />
        </View>
    );
};

export default LoadingSpinner;