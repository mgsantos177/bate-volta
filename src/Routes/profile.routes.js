import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/Profile';
import MyEvents from '../pages/Profile/MyEvents';
import Details from '../pages/Profile/MyEvents/Details';
import ProfileDetails from '../pages/Profile/ProfileDetails';

const ProfileStack = createStackNavigator();

export default function ProfileStackScreen({ route }) {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <ProfileStack.Screen
                name="Profile"
                options={{ title: ' ' }}
                component={Profile}
            />
            <ProfileStack.Screen
                name="ProfileDetails"
                component={ProfileDetails}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
            <ProfileStack.Screen
                name="My Events"
                component={MyEvents}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />

            <ProfileStack.Screen
                name="My Event Details"
                component={Details}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
        </ProfileStack.Navigator>
    );
}
