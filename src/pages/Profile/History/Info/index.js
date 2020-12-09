import React, { useState, useEffect } from 'react';

import { View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Background from '../../../../components/Background/home';
import api from '../../../../services/api';

import { Container, ListOptions, Separator, Text } from '../styles';

const Info = ({ route }) => {
    let { userId } = route.params;

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const [userData, setUserData] = useState([]);

    const [reserva, setReserva] = useState(0);
    const [event, setEvent] = useState(0);

    async function getUserDetails() {
        const response = await api.get(`/users/${userId}`);

        const responseEvent = await api.get(`/events/end/?id=${userId}`);
        const responseAppointment = await api.get(`/reserva/end/?id=${userId}`);

        setEvent(responseEvent.data.length);

        setReserva(responseAppointment.data.length);

        setUserData(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            getUserDetails();
        }
    }, [isFocused]);

    return (
        <Background>
            <Container>
                <Separator />
                <TouchableOpacity onPress={() => {}}>
                    <ListOptions>
                        <Icon name="person" size={30} color={'#0388e0'} />
                        <Text>{userData.name}</Text>
                    </ListOptions>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity onPress={() => {}}>
                    <ListOptions>
                        <Icon name="subtitles" size={30} color={'#0388e0'} />
                        <Text>{userData.cpf}</Text>
                    </ListOptions>
                </TouchableOpacity>

                <Separator />
                <TouchableOpacity onPress={() => {}}>
                    <ListOptions>
                        <Icon name="mail-outline" size={30} color={'#0388e0'} />
                        <Text>{userData.email}</Text>
                    </ListOptions>
                </TouchableOpacity>

                <Separator />
                <TouchableOpacity onPress={() => {}}>
                    <ListOptions>
                        <Icon name="phone" size={30} color={'#0388e0'} />
                        <Text>{userData.telefone}</Text>
                    </ListOptions>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity onPress={() => {}}>
                    <ListOptions>
                        <Icon
                            name="airport-shuttle"
                            size={30}
                            color={'#0388e0'}
                        />
                        <Text> {event} Eventos Concluídos</Text>
                    </ListOptions>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity onPress={() => {}}>
                    <ListOptions>
                        <Icon
                            name="flight-takeoff"
                            size={30}
                            color={'#0388e0'}
                        />
                        <Text>{reserva} Viagens Realizadas</Text>
                    </ListOptions>
                </TouchableOpacity>
                <Separator />
            </Container>
        </Background>
    );
};

export default Info;
