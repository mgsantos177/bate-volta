import React, { useState, useEffect } from 'react';
import StartRating from 'react-native-star-rating';

import { View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Background from '../../../../components/Background/home';
import api from '../../../../services/api';

import { Container, ListOptions, Text, TextEmpty } from '../styles';
import {
    NameEvent,
    Left,
    Avatar,
    Info,
    Name,
    Time,
    Content,
    Separator,
} from './styles';

const Rating = ({ route }) => {
    let { userId, url } = route.params;

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const [ratings, setRating] = useState([]);

    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';

    async function getUserDetails() {
        const response = await api.get(`/user/rating/${userId}`);

        console.tron.log(response.data);

        setRating(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            getUserDetails();
        }
    }, [isFocused]);

    return (
        <Background>
            <Container>
                {ratings ? (
                    <FlatList
                        data={ratings}
                        keyExtractir={(item) => item.id}
                        renderItem={({ item }) => (
                            <ScrollView>
                                <TouchableOpacity>
                                    <Content>
                                        <Left>
                                            <Avatar
                                                source={{
                                                    uri: item.Avaliador.avatar
                                                        ? `${baseURL}/${item.Avaliador.avatar}`
                                                        : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                                                }}
                                            />

                                            <Info>
                                                <NameEvent>
                                                    {item.Avaliador.name}
                                                </NameEvent>
                                                <Name>
                                                    {item.Avaliador.email}
                                                </Name>
                                                {/* <Time>{dateParsed}</Time> */}
                                            </Info>
                                        </Left>
                                        <Separator />
                                        <Text>
                                            <NameEvent> Evento: </NameEvent>
                                            {item.Event.name}
                                        </Text>
                                        <Text>
                                            <NameEvent>Data: </NameEvent>
                                            {new Date(
                                                item.Event.data_inicio
                                            ).toDateString()}
                                        </Text>
                                        <Separator />
                                        <View
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',

                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Text>
                                                <NameEvent>
                                                    Avaliação:{' '}
                                                </NameEvent>
                                            </Text>

                                            <StartRating
                                                disabled={true}
                                                maxStars={5}
                                                rating={item.nota}
                                                starSize={20}
                                                iconSet={'MaterialIcons'}
                                                fullStar={'star'}
                                                emptyStar={'star-border'}
                                                halfStar={'star-half'}
                                                fullStarColor={'gold'}
                                            />
                                        </View>
                                        <Text>
                                            <NameEvent>Comentarios:</NameEvent>
                                            {item.comentario}
                                        </Text>
                                    </Content>
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    />
                ) : (
                    <TextEmpty>Usuário não possui nenhuma avaliação.</TextEmpty>
                )}
            </Container>
        </Background>
    );
};

export default Rating;
