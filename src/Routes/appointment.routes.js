import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Appointment from '../pages/Appointment';
import EventDetail from '../pages/Home/EventDetail';

const AppointmenteStack = createStackNavigator();

export default function AppointmenteStackScreen({ route }) {
    return (
        <AppointmenteStack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <AppointmenteStack.Screen
                name="Appointment"
                options={{ title: ' ' }}
                component={Appointment}
            />
            <AppointmenteStack.Screen
                name="Event Details"
                component={EventDetail}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
        </AppointmenteStack.Navigator>
    );
}
