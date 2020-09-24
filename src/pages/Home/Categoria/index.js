import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Background from '../../../components/Background/home';
import api from '../../../services/api';
import {
    Container,
    Content,
    Image,
    Info,
    Name,
    Date,
    Owner,
    OwnerInfo,
    Title,
    Price,
    PriceText,
    PriceInfo,
} from './styles';
import StartRating from 'react-native-star-rating';
const Categoria = ({ route }) => {
    const [events, setEvents] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { filtro } = route.params;
    const baseURL = 'http://10.0.2.2:3333';

    async function loadEvents() {
        let response;
        if (filtro) {
            response = await api.get(
                `/events/category?limit=10&categoria=${filtro}`
            );
        } else {
            response = await api.get(`/events`);
        }

        setEvents(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadEvents();
        }
    }, [isFocused]);

    // <FlatList
    //     data={events}
    //     keyExtractir={(item) => String(events.id)}
    //     renderItem={({ item }) => <Events data={item} />}
    // />;
    return (
        <Background>
            <Container>
                <Title>
                    {filtro ? filtro.toUpperCase() : 'Todos os Eventos'}
                </Title>
                <FlatList
                    data={events}
                    keyExtractir={(item) => String(events.id)}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Event Details', {
                                    data: item,
                                })
                            }
                        >
                            <Content>
                                <Image
                                    source={{
                                        uri: item.EventFiles[0]
                                            ? `${baseURL}/files/${item.EventFiles[0].path}`
                                            : 'https://api.adorable.io/avatars/285/abott@adorable.png',
                                    }}
                                />
                                <Info>
                                    <Name>{item.name}</Name>
                                    <OwnerInfo>
                                        <Owner>por {item.User.name}</Owner>
                                        <StartRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={4}
                                            starSize={15}
                                            iconSet={'MaterialIcons'}
                                            fullStar={'star'}
                                            emptyStar={'star-border'}
                                            halfStar={'star-half'}
                                            fullStarColor={'gold'}
                                        />
                                    </OwnerInfo>
                                    <Date>
                                        {format(
                                            parseISO(item.data_inicio),
                                            'PPPPpp',
                                            {
                                                locale: pt,
                                            }
                                        )}
                                    </Date>
                                    <PriceInfo>
                                        <Price>R$ {item.preco}</Price>
                                        <PriceText> /pessoa</PriceText>
                                    </PriceInfo>
                                </Info>
                            </Content>
                        </TouchableOpacity>
                    )}
                />
            </Container>
        </Background>
    );
};

export default Categoria;
