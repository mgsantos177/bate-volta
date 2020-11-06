import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

import { Container, Content, Text } from './styles';
import Background from '../../../components/Background/home';
import { ScrollView } from 'react-native';

function Notification() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [notifications, setNotifications] = useState([]);

    async function loadNotifications() {
        const getNotification = await api.get('/notifications');

        console.tron.log(getNotification);

        setNotifications(getNotification.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadNotifications();
        }
    }, [isFocused]);

    const updateStatus = async (notification) => {
        await api.put('/notifications', {
            _id: notification._id,
        });
        await loadNotifications();
    };

    return (
        <Background>
            <Container>
                <ScrollView>
                    {notifications &&
                        notifications.map((notification) => (
                            <Content
                                onPress={() => {
                                    !notification.read &&
                                        updateStatus(notification);
                                }}
                                key={notification._id}
                                style={
                                    !notification.read && {
                                        backgroundColor: 'aliceblue',
                                    }
                                }
                            >
                                <Text>{`Oba... ${notification.user_name} reservou ${notification.qtde_reservas} lugares em seu evento ${notification.event_name}`}</Text>
                            </Content>
                        ))}
                </ScrollView>
            </Container>
        </Background>
    );
}

export default Notification;
