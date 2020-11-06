import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Notification from '../pages/Home/Notification';
import Home from '../pages/Home';
import EventDetail from '../pages/Home/EventDetail';
import Categoria from '../pages/Home/Categoria';
import Reserva from '../pages/Home/Reserva';
import AllQuestions from '../pages/Home/EventDetail/AllQuestions';
import NewQuestion from '~/pages/Home/EventDetail/NewQuestion';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ route }) {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <HomeStack.Screen
                name="Home"
                options={{ title: ' ' }}
                component={Home}
            />
            <HomeStack.Screen
                name="Categoria"
                options={{ title: ' ' }}
                component={Categoria}
            />
            <HomeStack.Screen
                name="Notifications"
                options={{ title: 'Notificações' }}
                component={Notification}
            />
            <HomeStack.Screen
                name="allQuestions"
                options={{
                    title: 'Perguntas',
                }}
                component={AllQuestions}
            />

            <HomeStack.Screen
                name="newQuestion"
                options={{
                    title: 'Nova Pergunta',
                }}
                component={NewQuestion}
            />
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
