import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { parseISO, formatRelative, format, toDate } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StartRating from 'react-native-star-rating';
import { SliderBox } from 'react-native-image-slider-box';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Background from '../../../components/Background/home';
import praia from '../../../assets/praia.jpg';
import {
    Container,
    Title,
    OwnerInfo,
    Owner,
    DateInfo,
    EventInfo,
    Sessions,
    MoreInfo,
    TitleInfo,
    Info,
    FooterInfo,
    AnswerBox,
    AnswerText,
    QuestionBox,
    QuestionLink,
    QuestionLinkText,
    QuestionText,
    Left,
    Price,
    Separator,
    ReservaButton,
    QuestionArea,
} from './styles';
import api from '../../../services/api';

const EventDetail = ({ route }) => {
    const { data } = route.params;

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [questions, setQuestions] = useState([]);
    const [images, setImages] = useState([]);

    async function loadImages() {
        const response = await api.get(`/event/comments/${data.id}`);
        const response2 = await api.get(`/events/${data.id}`);
        setQuestions(response.data);

        if (response2.data.images) {
            setImages(response2.data.images);
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadImages();
        }
    }, [isFocused]);

    const datePartidaParsed = format(parseISO(data.data_inicio), 'PPPPpp', {
        locale: pt,
    });

    const dateRetornoParsed = format(parseISO(data.data_fim), 'PPPPpp', {
        locale: pt,
    });

    const images2 = ['https://api.adorable.io/avatars/285/abott@adorable.png'];

    console.log(images);
    return (
        <Background>
            <Container style={{ flex: 1 }}>
                <ScrollView style={{ marginBottom: 30 }}>
                    {/* <Image
                        source={{
                            uri: data.EventFiles[0]
                                ? `${baseURL}/files/${data.EventFiles[0].path}`
                                : 'https://api.adorable.io/avatars/285/abott@adorable.png',
                        }}
                        style={{
                            width: '100%',
                            height: 250,
                            resizeMode: 'cover',
                        }}
                    /> */}

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

                    <View
                        style={{
                            flex: 1,
                            paddingLeft: 10,
                            paddingTop: 10,
                            marginLeft: 5,
                        }}
                    >
                        <Title>{data.name}</Title>
                        <OwnerInfo>
                            <Owner>com {data.User.name}</Owner>
                            <StartRating
                                disabled={true}
                                maxStars={5}
                                rating={4}
                                starSize={20}
                                iconSet={'MaterialIcons'}
                                fullStar={'star'}
                                emptyStar={'star-border'}
                                halfStar={'star-half'}
                                fullStarColor={'gold'}
                            />
                        </OwnerInfo>
                        <DateInfo>Partida: {datePartidaParsed}</DateInfo>
                        <DateInfo>
                            Retorno: {dateRetornoParsed.toString()}
                        </DateInfo>
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
                                <TitleInfo>Minimo de participantes:</TitleInfo>
                                <Info>{data.qtde_participantes_min}</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Maximo de participantes:</TitleInfo>
                                <Info>{data.qtde_participantes_max}</Info>
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
                        <Separator />
                        <QuestionArea>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('allQuestions', {
                                        questions,
                                        event: data,
                                    })
                                }
                            >
                                <Sessions>Perguntas</Sessions>
                                {questions[0] ? (
                                    <>
                                        <QuestionBox>
                                            <Icon
                                                name="chat"
                                                size={20}
                                                color={'#999'}
                                            />
                                            <QuestionText>
                                                {questions[0].comentario}
                                            </QuestionText>
                                        </QuestionBox>
                                        {questions[0].answer_id && (
                                            <AnswerBox>
                                                <Icon
                                                    name="chat"
                                                    size={15}
                                                    color={'#ccc'}
                                                />
                                                <AnswerText>
                                                    {
                                                        questions[0].answer_id
                                                            .comentario
                                                    }
                                                </AnswerText>
                                            </AnswerBox>
                                        )}
                                    </>
                                ) : (
                                    <AnswerText>
                                        {' '}
                                        Nenhuma pergunta até o momento{' '}
                                    </AnswerText>
                                )}
                                <QuestionLink
                                    onPress={() =>
                                        navigation.navigate('newQuestion', {
                                            event: data,
                                        })
                                    }
                                >
                                    <QuestionLinkText>
                                        Perguntar
                                    </QuestionLinkText>
                                </QuestionLink>
                            </TouchableOpacity>
                        </QuestionArea>
                    </View>
                </ScrollView>
                <Separator />
                <FooterInfo>
                    <Left>
                        <Text>
                            {data.lugares_disponiveis -
                                data.qtde_participantes_max}
                            /{data.qtde_participantes_max}
                            {'  '}
                            <Icon name="seat" size={20} />
                        </Text>
                        <Price>R$ {data.preco}</Price>
                    </Left>
                    <ReservaButton
                        title="Reservar"
                        onPress={() =>
                            navigation.navigate('Reserva', {
                                data,
                                datePartidaParsed,
                            })
                        }
                    >
                        Reservar
                    </ReservaButton>
                </FooterInfo>
            </Container>
        </Background>
    );
};

export default EventDetail;
