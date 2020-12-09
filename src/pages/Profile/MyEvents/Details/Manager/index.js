import React from 'react';

import { View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Background from '../../../../../components/Background/home';
import api from '../../../../../services/api';

import {
    Container,
    Separator,
    Text,
    ListOptions,
} from '../../../History/styles';

const Manager = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation();
    return (
        <Background>
            <Container>
                <Separator />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Passageiros', {
                            data,
                        });
                    }}
                >
                    <ListOptions>
                        <Icon2
                            name="clipboard-text-outline"
                            size={30}
                            color={'#0388e0'}
                        />
                        <Text>Lista de Passageiros</Text>
                    </ListOptions>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Perguntas', {
                            data,
                        });
                    }}
                >
                    <ListOptions>
                        <Icon2
                            name="comment-outline"
                            size={30}
                            color={'#0388e0'}
                        />
                        <Text>Perguntas</Text>
                    </ListOptions>
                </TouchableOpacity>
                <Separator />
            </Container>
        </Background>
    );
};

export default Manager;
