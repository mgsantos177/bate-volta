import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId:
        '241409991996-8jkbdnsitk4gutm434ga8c3ij6e3dbq4.apps.googleusercontent.com',
    offlineAccess: true,
});

// import { Container } from './styles';
import Routes from './routes';

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Routes />
        </NavigationContainer>
    );
}
