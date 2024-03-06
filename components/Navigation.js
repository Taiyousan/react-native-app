import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Search from './Search';
import Team from './Team';
import Settings from './Settings';
import Details from './Details';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Parcourir le Pokédex" component={Home} />
            <Stack.Screen name="Fiche Pokémon" component={Details} />
        </Stack.Navigator>
    );
}
function TeamStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Équipe" component={Team} />
            <Stack.Screen name="Détail" component={Details} />
        </Stack.Navigator>
    );
}




function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Pokédex" component={HomeStack} />
            <Tab.Screen name="Recherche" component={Search} />
            <Tab.Screen name="Équipe" component={TeamStack} />
            <Tab.Screen name="Paramètres" component={Settings} />
        </Tab.Navigator>
    );
}


export default Tabs;