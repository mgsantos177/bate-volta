import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
             <StatusBar barStyle="light-content" backgroundColor="#40c3e4" />
            <Stack.Navigator
                headerMode="none"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#e5f56c',
                    },
                    headerTintColor: '#fff',
                }}
            >
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
