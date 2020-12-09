import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { Container } from '../../styles';
import {
    List,
    Content,
    Left,
    Info,
    Name,
    Avatar,
    NameEvent,
    SignLink,
    SignLinkText,
} from './styles';
import Background from '../../../../../../components/Background/home';
import api from '../../../../../../services/api';

const Perguntas = ({ route }) => {
    const { data } = route.params;

    console.tron.log(data);

    const [passageiros, setPassageiros] = useState();
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    async function loadEvents() {
        const response = await api.get(`/event/comments/null/${data.id}`);
        setPassageiros(response.data);
        console.tron.log(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadEvents();
        }
    }, [isFocused]);

    const redirectUserProfile = async (id) => {
        await navigation.navigate('profile', {
            screen: 'History',
            params: { userId: id },
        });
    };

    return (
        <Background>
            <Container>
                <List
                    data={passageiros}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={async () => {
                                await redirectUserProfile(item.User.id);
                            }}
                        >
                            <Content>
                                <Left>
                                    <Avatar
                                        source={{
                                            uri: item.User.avatar
                                                ? `${baseURL}/${item.User.avatar}`
                                                : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                                        }}
                                    />
                                    <Info>
                                        <NameEvent>
                                            {item.User.name} fez uma pergunta no
                                            seu evento {item.Event.name}
                                        </NameEvent>

                                        <SignLink
                                            onPress={() =>
                                                navigation.navigate(
                                                    'Responder',
                                                    {
                                                        data: item,
                                                    }
                                                )
                                            }
                                        >
                                            <SignLinkText>
                                                Responder
                                            </SignLinkText>
                                        </SignLink>
                                    </Info>
                                </Left>
                            </Content>
                        </TouchableOpacity>
                    )}
                />
            </Container>
        </Background>
    );
};

export default Perguntas;
