import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Alert, TouchableOpacity, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { parseISO, format } from 'date-fns';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import pt from 'date-fns/locale/pt';
import StartRating from 'react-native-star-rating';
import Background from '../../../../components/Background/home';
import {
    Container,
    Content,
    Image,
    OwnerInfo,
    Owner,
    Title,
    DateInfo,
    Separator,
    UpdateButton,
    EventInfo,
    Sessions,
    TextInput,
} from './styles';

import api from '../../../../services/api';

const Details = ({ route }) => {
    const { data } = route.params;
    console.tron.log(data);
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';
    const navigation = useNavigation();

    const isFocused = useIsFocused();
    const [images, setImages] = useState([]);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [done, setDone] = useState([]);

    async function loadQuestions() {
        const response2 = await api.get(`/events/${data.Event.id}`);

        const response = await api.post(`/user/rating/verify`, {
            event: data.Event.id,
        });

        setDone(response.data);

        if (response2.data.images) {
            setImages(response2.data.images);
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadQuestions();
        }
    }, [isFocused]);

    const datePartidaParsed = format(
        parseISO(data.Event.data_inicio),
        'PPPPpp',
        {
            locale: pt,
        }
    );

    const dateRetornoParsed = format(parseISO(data.Event.data_fim), 'PPPPpp', {
        locale: pt,
    });

    const images2 = ['https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png'];

    const sendAvaliation = async () => {
        try {
            const response = await api.post('/user/rating', {
                comentario: text,
                nota: rating,
                avaliado: data.Event.criado_por,
                event: data.Event.id,
            });

            Alert.alert('Sucesso', 'Evento Avaliado');
            await navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Erro ao avaliar Evento');
        }
    };

    return (
        <Background>
            <Container>
                <ScrollView>
                    {images.length !== 0 ? (
                        <SliderBox
                            images={images}
                            sliderBoxHeight={275}
                            dotColor="#FFEE58"
                            inactiveDotColor="#90A4AE"
                            ImageComponentStyle={{
                                borderRadius: 7,
                                width: '100%',
                            }}
                        />
                    ) : (
                        <SliderBox
                            images={images2}
                            sliderBoxHeight={275}
                            dotColor="#FFEE58"
                            inactiveDotColor="#90A4AE"
                            ImageComponentStyle={{
                                borderRadius: 7,
                                width: '100%',
                            }}
                        />
                    )}

                    <Content>
                        <Title>{data.Event.name}</Title>

                        <DateInfo>Partida: {datePartidaParsed}</DateInfo>
                        <DateInfo>Retorno: {dateRetornoParsed}</DateInfo>
                        <Owner>
                            Você reservou {data.qtde_reservas} lugares nesse
                            evento
                        </Owner>
                        <Separator />
                        {done ? (
                            <>
                                <Sessions>Você já avaliou esse evento</Sessions>
                                <OwnerInfo>
                                    <Owner>com {data.Event.User.name}</Owner>
                                </OwnerInfo>
                                <View
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <StartRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={done.nota}
                                        starSize={22}
                                        iconSet={'MaterialIcons'}
                                        fullStar={'star'}
                                        emptyStar={'star-border'}
                                        halfStar={'star-half'}
                                        fullStarColor={'gold'}
                                    />
                                </View>

                                <Sessions>Sua descrição do evento:</Sessions>
                                <DateInfo>{done.comentario}</DateInfo>
                            </>
                        ) : (
                            <EventInfo>
                                <Sessions>
                                    Avaliar evento de {data.Event.User.name}:
                                </Sessions>

                                <StartRating
                                    maxStars={5}
                                    rating={rating}
                                    starSize={35}
                                    iconSet={'MaterialIcons'}
                                    fullStar={'star'}
                                    emptyStar={'star-border'}
                                    halfStar={'star-half'}
                                    fullStarColor={'gold'}
                                    selectedStar={(value) => setRating(value)}
                                />
                                <TextInput
                                    multiline={true}
                                    value={text}
                                    onChangeText={setText}
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    placeholder={
                                        'Faça uma descrição de como foi o evento'
                                    }
                                />

                                <UpdateButton
                                    title="Reservar"
                                    onPress={sendAvaliation}
                                >
                                    Enviar
                                </UpdateButton>
                            </EventInfo>
                        )}
                    </Content>
                    <Separator />
                </ScrollView>

                {/* <FooterInfo>
                    <UpdateButton
                        title="Reservar"
                        onPress={() =>
                            navigation.navigate('Update Appointment', {
                                data,
                            })
                        }
                    >

                        Alterar
                    </UpdateButton>
                    <CancelButton
                        title="Reservar"
                        onPress={() =>
                            Alert.alert(
                                'Cancelar Reserva',
                                'Tem certeza que deseja cancelar suas reservas ?',
                                [
                                    {
                                        text: 'Não',
                                    },
                                    {
                                        text: 'Sim',
                                        onPress: handleCancel,
                                    },
                                ]
                            )
                        }
                    >

                        Cancelar
                    </CancelButton>
                </FooterInfo> */}
            </Container>
        </Background>
    );
};

export default Details;
