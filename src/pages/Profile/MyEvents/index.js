import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Background from '../../../components/Background/home';
import { Container, Title, List } from './styles';
import ListMyEvents from '../../../components/ListMyEvents';
import api from '../../../services/api';
import { useIsFocused } from '@react-navigation/native';


const MyEvents = () => {
    const [events, setEvents] = useState();
    const isFocused = useIsFocused();
    async function loadEvents() {
        const response = await api.get('users/events');
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
                <List
                    data={events}
                    keyExtractor={(item) => String(events.id)}
                    renderItem={({ item }) => <ListMyEvents data={item} />}
                />
            </Container>
        </Background>
    );
};

export default MyEvents;
