import React from 'react';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
// import { Container } from './styles';

import './config/reactotronConfig';

import { store, persistor } from './store';
import App from './App';
import Routes from './routes';

export default function config() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
}
