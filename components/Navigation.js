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
            <Stack.Screen name="Accueil-Accueil" component={Home} />
            <Stack.Screen name="Accueil-Detail" component={Details} />
        </Stack.Navigator>
    );
}

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Accueil" component={HomeStack} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Team" component={Team} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

export default Tabs;