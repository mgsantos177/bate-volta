import React from 'react';
import Event from '../pages/Event';
import Profile from '../pages/Profile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './explore.routes';
import AppointmentStackScreen from './appointment.routes';
import ProfileStackScreen from './profile.routes';

const Tab = createBottomTabNavigator();

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function HomeRoutes() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#fff',
                inactiveTintColor: '#b5c7d3',
                keyboardHidesTabBar: true,
                style: {
                    backgroundColor: '#0388e0',
                },
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size, focused }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'search' : 'search';
                    } else if (route.name === 'reservas') {
                        iconName = focused ? 'event' : 'event';
                    } else if (route.name === 'create_event') {
                        iconName = focused ? 'add-box' : 'add';
                    } else if (route.name === 'profile') {
                        iconName = focused
                            ? 'account-circle'
                            : 'account-circle';
                    }
                    return (
                        <MaterialIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: ' Explorar',
                }}
                name="Home"
                component={HomeStackScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Minhas Reservas',
                }}
                name="reservas"
                component={AppointmentStackScreen}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Criar Evento',
                }}
                name="create_event"
                component={Event}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'Meu Perfil',
                }}
                name="profile"
                component={ProfileStackScreen}
            />
        </Tab.Navigator>
    );
}
