import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Background from '../../../components/Background/home';
import api from '../../../services/api';
import praia from '../../../assets/praia.jpg';
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
    const { filtro } = route.params;
    const [events, setEvents] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    async function loadEvents() {
        const response = await api.get(
            `/events/category?limit=10&categoria=${filtro}`
        );
        console.tron.log(response);
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
                <Title>{filtro.toUpperCase()}</Title>
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
                                <Image source={praia} />
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
                                    <Date>12/05/2012</Date>
                                    <PriceInfo>
                                        <Price>R$ 80,00</Price>
                                        <PriceText>/pessoa</PriceText>
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
