import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Alert } from 'react-native';
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
    CancelButton,
    UpdateButton,
    FooterInfo,
    EventInfo,
    Sessions,
    MoreInfo,
    TitleInfo,
    Info,
} from './styles';

import api from '../../../../services/api';

const Details = ({ route }) => {
    const { data } = route.params;
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';
    const navigation = useNavigation();

    console.tron.log(data);

    const isFocused = useIsFocused();
    const [images, setImages] = useState([]);
    const [eventData, setEventData] = useState();

    async function loadQuestions() {
        const response2 = await api.get(`/events/${data.id}`);

        setEventData(response2);
        if (response2.data.images) {
            setImages(response2.data.images);
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadQuestions();
        }
    }, [isFocused]);

    const datePartidaParsed = format(parseISO(data.data_inicio), 'PPPPpp', {
        locale: pt,
    });

    async function handleCancel() {
        try {
            const response = await api.put(`/reserva/cancelar/${data.id}`);

            Alert.alert('Sucesso', `${response.data.message}`);
            nativagation.navigate('Appointment');
        } catch (err) {
            Alert.alert('Erro!', `${err.response.data.error}`);
        }
    }

    const dateRetornoParsed = format(parseISO(data.data_fim), 'PPPPpp', {
        locale: pt,
    });

    const images2 = ['https://api.adorable.io/avatars/285/abott@adorable.png'];

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
                        <Title>{data.name}</Title>

                        <DateInfo>Partida: {datePartidaParsed}</DateInfo>
                        <DateInfo>Retorno: {dateRetornoParsed}</DateInfo>
                        <Separator />
                        <EventInfo>
                            <Sessions>Descrição:</Sessions>
                            <Text>{data.descricao}</Text>
                            <Separator />
                            <Sessions>Mais Informações:</Sessions>
                            <MoreInfo>
                                <TitleInfo>Local de Partida:</TitleInfo>
                                <Info>
                                    {data.end_partida}, {data.cidade_partida} -{' '}
                                    {data.estado_partida}
                                </Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Endereço do Destino:</TitleInfo>
                                <Info>
                                    {' '}
                                    {data.end_destino}, {data.cidade_destino} -{' '}
                                    {data.estado_destino}
                                </Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Tempo de viagem:</TitleInfo>
                                <Info>{data.tempo_viagem} hrs</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Tipo de Veiculo:</TitleInfo>
                                <Info>{data.tipo_veiculo}</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Modelo do Veiculo:</TitleInfo>
                                <Info>{data.modelo_veiculo}</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Placa do Veiculo:</TitleInfo>
                                <Info>{data.placa_veiculo}</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Cor do Veiculo:</TitleInfo>
                                <Info>{data.cor_veiculo}</Info>
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
                        Lista de Passageiros
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
                        {' '}
                        Cancelar
                    </CancelButton>
                </FooterInfo>
            </Container>
        </Background>
    );
};

export default Details;
