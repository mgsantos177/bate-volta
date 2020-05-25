import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import EventDetail from '../pages/Home/EventDetail';
import Categoria from '../pages/Home/Categoria';
import Reserva from '../pages/Home/Reserva';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ route }) {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerStyle:{
                    backgroundColor:'white'
                }
            }}

        >
            <HomeStack.Screen
                name="Home"
                options={{ title: ' ' }}
                component={Home}
            />
            <HomeStack.Screen name="Categoria" component={Categoria} />
            <HomeStack.Screen
                name="Event Details"
                component={EventDetail}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
            <HomeStack.Screen name="Reserva" component={Reserva} />
        </HomeStack.Navigator>
    );
}
