import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Background from '../../../components/Background/home';
import { Container, Title, List, TextEmpty } from './styles';
import ListMyEvents from '../../../components/ListMyEvents';
import api from '../../../services/api';
import { useIsFocused } from '@react-navigation/native';

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const isFocused = useIsFocused();
    async function loadEvents() {
        const response = await api.get('/user/events');
        setEvents(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadEvents();
        }
    }, [isFocused]);

    return (
        <Background>
            <Container>
                <Title>Meus Eventos</Title>
                {events.length > 0 ? (
                    <List
                        data={events}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => <ListMyEvents data={item} />}
                    />
                ) : (
                    <TextEmpty>Você não possui nenhum evento ativo!</TextEmpty>
                )}
            </Container>
        </Background>
    );
};

export default MyEvents;
