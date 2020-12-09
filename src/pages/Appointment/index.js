import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Background from '../../components/Background/home';
import { Container, Title, List, TextEmpty } from './styles';
import ListAppointments from '../../components/ListAppointments';
import api from '../../services/api';
import { useIsFocused } from '@react-navigation/native';

const Appointment = () => {
    const [appointment, setAppointment] = useState([]);
    const isFocused = useIsFocused();
    async function loadEvents() {
        const response = await api.get('/reserva');
        setAppointment(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadEvents();
        }
    }, [isFocused]);

    return (
        <Background>
            <Container>
                <Title>Minhas Reservas</Title>
                {appointment.length > 0 ? (
                    <List
                        data={appointment}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ListAppointments data={item} />
                        )}
                    />
                ) : (
                    <TextEmpty>
                        Você não possui nenhuma reserva ativa!
                    </TextEmpty>
                )}
            </Container>
        </Background>
    );
};

export default Appointment;
