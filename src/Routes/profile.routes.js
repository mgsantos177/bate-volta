import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/Profile';
import Sobre from '../pages/Profile/Sobre';
import MyEvents from '../pages/Profile/MyEvents';
import Manager from '../pages/Profile/MyEvents/Details/Manager';
import Passageiros from '../pages/Profile/MyEvents/Details/Manager/Passageiros';
import Perguntas from '../pages/Profile/MyEvents/Details/Manager/Perguntas';
import Responder from '../pages/Profile/MyEvents/Details/Manager/Perguntas/Responder';
import History from '../pages/Profile/History';
import Info from '../pages/Profile/History/Info';
import Pass from '../pages/Profile/History/Pass';
import Avaliation from '../pages/Profile/History/Avaliation';
import Rating from '../pages/Profile/History/Rating';
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

            <ProfileStack.Screen
                name="History"
                component={History}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />

            <ProfileStack.Screen
                name="Info"
                component={Info}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />

            <ProfileStack.Screen
                name="Pass"
                component={Pass}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
            <ProfileStack.Screen
                name="Rating"
                component={Rating}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />

            <ProfileStack.Screen
                name="Avaliation"
                component={Avaliation}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
            <ProfileStack.Screen
                name="Manager"
                component={Manager}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
            <ProfileStack.Screen
                name="Passageiros"
                component={Passageiros}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
            <ProfileStack.Screen
                name="Perguntas"
                component={Perguntas}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />

            <ProfileStack.Screen
                name="Responder"
                component={Responder}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />

            <ProfileStack.Screen
                name="Sobre"
                component={Sobre}
                options={{
                    title: ' ',
                    headerStyle: { backgroundColor: 'white' },
                    headerTransparent: true,
                }}
            />
        </ProfileStack.Navigator>
    );
}
