import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { parseISO, format } from 'date-fns';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import pt from 'date-fns/locale/pt';
import StartRating from 'react-native-star-rating';
import Background from '../../../components/Background/home';
import {
    Container,
    Content,
    Image,
    OwnerInfo,
    Owner,
    Title,
    DateInfo,
    Separator,
    CancelButton,
    UpdateButton,
    FooterInfo,
    EventInfo,
    Sessions,
    MoreInfo,
    TitleInfo,
    Info,
} from './styles';

import api from '../../../services/api';

const Details = ({ route }) => {
    const { data } = route.params;
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';
    const navigation = useNavigation();

    const isFocused = useIsFocused();
    const [images, setImages] = useState([]);

    async function loadQuestions() {
        const response2 = await api.get(`/events/${data.Event.id}`);

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

    async function handleCancel() {
        try {
            const response = await api.put(`/reserva/cancelar/${data.id}`);

            Alert.alert('Sucesso', `${response.data.message}`);
            navigation.navigate('Appointment');
        } catch (err) {
            Alert.alert('Erro!', `${err.response.data.error}`);
        }
    }

    const dateRetornoParsed = format(parseISO(data.Event.data_fim), 'PPPPpp', {
        locale: pt,
    });

    const images2 = ['https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png'];

    const redirectUserProfile = async () => {
        await navigation.navigate('profile', {
            screen: 'History',
            params: { userId: data.Event.criado_por },
        });
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
                        <OwnerInfo>
                            <TouchableOpacity
                                onPress={async () => {
                                    await redirectUserProfile();
                                }}
                            >
                                <Owner>com {data.Event.User.name}</Owner>
                            </TouchableOpacity>
                            <StartRating
                                disabled={true}
                                maxStars={5}
                                rating={4}
                                starSize={18}
                                iconSet={'MaterialIcons'}
                                fullStar={'star'}
                                emptyStar={'star-border'}
                                halfStar={'star-half'}
                                fullStarColor={'gold'}
                            />
                        </OwnerInfo>
                        <DateInfo>Partida: {datePartidaParsed}</DateInfo>
                        <DateInfo>Retorno: {dateRetornoParsed}</DateInfo>
                        <Owner>
                            Você reservou {data.qtde_reservas} lugares nesse
                            evento
                        </Owner>
                        <Separator />
                        <EventInfo>
                            <Sessions>Descrição:</Sessions>
                            <Text>{data.Event.descricao}</Text>
                            <Separator />
                            <Sessions>Mais Informações:</Sessions>
                            <MoreInfo>
                                <TitleInfo>Local de Partida:</TitleInfo>
                                <Info>
                                    {data.Event.end_partida},
                                    {data.Event.cidade_partida} -
                                    {data.Event.estado_partida}
                                </Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Endereço do Destino:</TitleInfo>
                                <Info>

                                    {data.Event.end_destino},
                                    {data.Event.cidade_destino} -
                                    {data.Event.estado_destino}
                                </Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Tempo de viagem:</TitleInfo>
                                <Info>{data.Event.tempo_viagem} hrs</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Tipo de Veiculo:</TitleInfo>
                                <Info>{data.Event.tipo_veiculo}</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Modelo do Veiculo:</TitleInfo>
                                <Info>{data.Event.modelo_veiculo}</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Placa do Veiculo:</TitleInfo>
                                <Info>{data.Event.placa_veiculo}</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Cor do Veiculo:</TitleInfo>
                                <Info>{data.Event.cor_veiculo}</Info>
                            </MoreInfo>
                        </EventInfo>
                    </Content>
                    <Separator />
                </ScrollView>

                <FooterInfo>
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
                </FooterInfo>
            </Container>
        </Background>
    );
};

export default Details;
