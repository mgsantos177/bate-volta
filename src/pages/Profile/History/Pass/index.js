import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Background from '../../../../components/Background/home';
import api from '../../../../services/api';

import { Container, ListOptions, Separator, Text } from '../styles';
import { NameEvent, Left, Avatar, Info, Name, Time, Content } from './styles';

const Pass = ({ route }) => {
    let { userId, url } = route.params;

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const profile = useSelector((state) => state.user.profile.id);

    const [userData, setUserData] = useState([]);
    const [events, setEvents] = useState([]);

    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';

    async function getUserDetails() {
        const response = await api.get(`/${url}/end/?id=${userId}`);
        const response2 = await api.get(`/users/${userId}`);

        setEvents(response.data);
        setUserData(response2.data);
    }

    useEffect(() => {
        if (isFocused) {
            getUserDetails();
        }
    }, [isFocused]);

    return (
        <Background>
            <Container>
                <FlatList
                    data={events}
                    keyExtractir={(item) => item.id}
                    renderItem={({ item }) => (
                        <ScrollView>
                            <TouchableOpacity
                                onPress={() => {
                                    if (
                                        url === 'reserva' &&
                                        profile === userId
                                    ) {
                                        navigation.navigate('Avaliation', {
                                            data: item,
                                        });
                                    }
                                }}
                            >
                                <Content>
                                    {url === 'events' ? (
                                        <Left>
                                            <Avatar
                                                source={{
                                                    uri: item.images
                                                        ? `${baseURL}/${item.images[0]}`
                                                        : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                                                }}
                                            />

                                            <Info>
                                                <NameEvent>
                                                    {item.name}
                                                </NameEvent>
                                                <Name>
                                                    com {item.User.name}
                                                </Name>
                                                {/* <Time>{dateParsed}</Time> */}
                                            </Info>
                                        </Left>
                                    ) : (
                                        <Left>
                                            <Avatar
                                                source={{
                                                    uri: item.Event.images
                                                        ? `${baseURL}/${item.Event.images[0]}`
                                                        : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                                                }}
                                            />

                                            <Info>
                                                <NameEvent>
                                                    {item.Event.name}
                                                </NameEvent>
                                                <Name>
                                                    com {item.Event.User.name}
                                                </Name>
                                                {/* <Time>{dateParsed}</Time> */}
                                            </Info>
                                        </Left>
                                    )}
                                </Content>
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                />
            </Container>
        </Background>
    );
};

export default Pass;
