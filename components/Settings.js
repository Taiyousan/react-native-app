import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Settings = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const toggleNotifications = () => {
        setNotificationsEnabled(previousState => !previousState);
    };

    const toggleDarkMode = () => {
        setDarkModeEnabled(previousState => !previousState);
    };

    const toggleVibration = () => {
        setVibrationEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paramètres</Text>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Notifications Push</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleNotifications}
                    value={notificationsEnabled}
                />
            </View>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Mode Sombre</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkMode}
                    value={darkModeEnabled}
                />
            </View>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Langue</Text>
                <Picker
                    selectedValue={selectedLanguage}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                    }
                >
                    <Picker.Item style={styles.lang} label="Anglais" value="en" />
                    <Picker.Item style={styles.lang} label="Français" value="fr" />
                    <Picker.Item style={styles.lang} label="Espagnol" value="es" />
                    <Picker.Item style={styles.lang} label="Allemand" value="de" />
                    <Picker.Item style={styles.lang} label="Italien" value="it" />
                    {/* Ajoutez d'autres langues selon les besoins de l'application */}
                </Picker>
            </View>

            <View style={styles.setting}>
                <Text style={styles.settingLabel}>Vibration</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={vibrationEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleVibration}
                    value={vibrationEnabled}
                />
            </View>

            {/* Ajoutez d'autres paramètres selon les besoins de l'application */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    settingLabel: {
        fontSize: 18,
    },
    lang: {
        fontSize: 18,
        color: 'black',
    },
});

export default Settings;
