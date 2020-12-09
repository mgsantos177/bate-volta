import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import Modal from '../../../components/Modal';

import pt from 'date-fns/locale/pt';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Background from '../../../components/Background/home';
import api from '../../../services/api';
import {
    Container,
    Content,
    IconArea,
    Image,
    Info,
    Name,
    Owner,
    OwnerInfo,
    Title,
    TitleArea,
    TitleView,
    Price,
    PriceText,
    PriceInfo,
} from './styles';
import StartRating from 'react-native-star-rating';
import { DateText } from '~/components/DataInput/styles';
const Categoria = ({ route }) => {
    const [events, setEvents] = useState([]);
    const [cidadeDestino, setCidadeDestino] = useState('');
    const [dataPartida, setDataPartida] = useState('');
    const [dataRetorno, setDataRetorno] = useState('');

    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { filtro } = route.params;
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';

    async function loadEvents() {
        let response;
        let helper = '';
        if (cidadeDestino) {
            helper = `&cidade_destino=${cidadeDestino}`;
            response = await api.get(
                `/events/category?limit=10&cidade_destino=${cidadeDestino}`
            );
        }
        if (filtro) {
            helper = helper + `&categoria=${filtro}`;

            response = await api.get(
                `/events/category?limit=10&categoria=${filtro}&cidade_destino=${cidadeDestino}`
            );
        }

        if (dataPartida) {
            const dataPartida2 = new Date(dataPartida);
            helper = helper + `&data_inicio=${dataPartida2}`;
        }

        if (dataRetorno) {
            const dataRetorno2 = new Date(dataRetorno);
            helper = helper + `&data_fim=${new Date(dataRetorno2)}`;
        }

        response = await api.get(`/events/category?limit=10${helper}`);

        setEvents(response.data);
    }

    const applyFilter = async () => {
        await loadEvents();
    };

    const cleanFilter = async () => {
        await setCidadeDestino();
        await setDataPartida();
        await setDataRetorno();
        await loadEvents();
    };

    const applyFilterCidadeDestino = async (value) => {
        await setCidadeDestino(value);
    };

    const applyDataPartida = async (value) => {
        await setDataPartida(value);
    };

    const applyDataRetorno = async (value) => {
        await setDataRetorno(value);
    };

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
                <TitleView>
                    <TitleArea>
                        <Title>
                            {filtro ? filtro.toUpperCase() : 'Todos os Eventos'}
                        </Title>
                    </TitleArea>
                    <IconArea>
                        <Modal
                            data={events}
                            applyFilter={applyFilter}
                            cleanFilter={cleanFilter}
                            cidadeDestino={applyFilterCidadeDestino}
                            dataPartida={applyDataPartida}
                            dataRetorno={applyDataRetorno}
                        />
                    </IconArea>
                </TitleView>

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
                                        uri:
                                            item.images.length > 0
                                                ? `${baseURL}/${item.images[0]}`
                                                : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                                    }}
                                    style={{
                                        resizeMode: 'cover',
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
                                    <DateText>
                                        {format(
                                            parseISO(item.data_inicio),
                                            'PPPPpp',
                                            {
                                                locale: pt,
                                            }
                                        )}
                                    </DateText>
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
