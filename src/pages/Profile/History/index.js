import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import StartRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../../components/Background/home';
import api from '../../../services/api';

import {
    Container,
    Avatar,
    ListOptions,
    Separator,
    Text,
    InfoArea,
    TextInfo,
    NameText,
} from './styles';

const History = ({ route }) => {
    let { userId } = route.params;

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';

    const [userData, setUserData] = useState([]);

    async function getUserDetails() {
        const response = await api.get(`/users/${userId}`);

        setUserData(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            getUserDetails();
        }
    }, [isFocused]);

    return (
        <Background>
            <ScrollView>
                <Container>
                    <Avatar
                        source={{
                            uri: userData.avatar
                                ? `${baseURL}/${userData.avatar}`
                                : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                        }}
                    />
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                        }}
                    >
                        <StartRating
                            disabled={true}
                            maxStars={5}
                            rating={4.2}
                            starSize={20}
                            iconSet={'MaterialIcons'}
                            fullStar={'star'}
                            emptyStar={'star-border'}
                            halfStar={'star-half'}
                            fullStarColor={'gold'}
                        />
                    </View>

                    <NameText style={{ alignSelf: 'center' }}>
                        {userData.name}
                    </NameText>

                    <Separator />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Info', {
                                userId: userData.id,
                            })
                        }
                    >
                        <ListOptions>
                            <Icon
                                name="info-outline"
                                size={30}
                                color={'#0388e0'}
                            />
                            <Text> Informações</Text>
                        </ListOptions>
                    </TouchableOpacity>

                    <Separator />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Rating', {
                                userId: userData.id,
                                url: 'reserva',
                            })
                        }
                    >
                        <ListOptions>
                            <Icon name="thumb-up" size={30} color={'#0388e0'} />
                            <Text> Avaliações</Text>
                        </ListOptions>
                    </TouchableOpacity>
                    <Separator />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Pass', {
                                userId: userData.id,
                                url: 'events',
                            })
                        }
                    >
                        <ListOptions>
                            <Icon
                                name="airport-shuttle"
                                size={30}
                                color={'#0388e0'}
                            />
                            <Text> Eventos Encerrados</Text>
                        </ListOptions>
                    </TouchableOpacity>
                    <Separator />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Pass', {
                                userId: userData.id,
                                url: 'reserva',
                            })
                        }
                    >
                        <ListOptions>
                            <Icon
                                name="flight-takeoff"
                                size={30}
                                color={'#0388e0'}
                            />
                            <Text> Viagens Encerradas</Text>
                        </ListOptions>
                    </TouchableOpacity>
                    <Separator />
                </Container>
            </ScrollView>
        </Background>
    );
};

export default History;
