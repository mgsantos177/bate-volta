import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Appointment from '../pages/Appointment';
import AppointmentDetail from '../pages/Appointment/Details';

const AppointmenteStack = createStackNavigator();

export default function AppointmenteStackScreen() {
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
                name="Appointment Details"
                component={AppointmentDetail}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
        </AppointmenteStack.Navigator>
    );
}
