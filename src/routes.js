import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const Stack = createStackNavigator();

import HomeRoutes from './Routes/home.routes';
export default function App() {
    const signed = useSelector((state) => state.auth.signed);

    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="SignIn"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#e5f56c',
                },
                headerTintColor: '#fff',
            }}
        >
            {signed ? (
                <Stack.Screen name="Explore" component={HomeRoutes} />
            ) : (
                <>
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                        options={{
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                                borderColor: 'black',
                            },
                        }}
                    />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </>
            )}
        </Stack.Navigator>
    );
}
