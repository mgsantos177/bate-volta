import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { parseISO, formatRelative, format, toDate } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StartRating from 'react-native-star-rating';
import { useNavigation } from '@react-navigation/native';
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
    Left,
    Price,
    Separator,
    ReservaButton,
} from './styles';
import api from '../../../services/api';

const EventDetail = ({ route }) => {
    const baseURL = 'http://10.0.2.2:3333';
    const { data } = route.params;
    const navigation = useNavigation();
    console.tron.log(data);
    const datePartidaParsed = format(parseISO(data.data_inicio), 'PPPPpp', {
        locale: pt,
    });

    const dateRetornoParsed = format(parseISO(data.data_fim), 'PPPPpp', {
        locale: pt,
    });

    console.tron.log(data.EventFiles[0]);

    return (
        <Background>
            <Container style={{ flex: 1 }}>
                <ScrollView style={{ marginBottom: 30 }}>
                    <Image
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
                    />
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
                                <Info>{data.local_partida}</Info>
                            </MoreInfo>
                            <MoreInfo>
                                <TitleInfo>Endereço do Destino:</TitleInfo>
                                <Info>{data.destino}</Info>
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
                        </EventInfo>
                    </View>
                </ScrollView>
                <Separator />
                <FooterInfo>
                    <Left>
                        <Text>
                            {data.lugares_disponiveis -
                                data.qtde_participantes_max}
                            /{data.qtde_participantes_max}{' '}
                            <Icon name="seat" size={20} />
                        </Text>
                        <Price>R$ 52,00</Price>
                    </Left>
                    <ReservaButton
                        title="Reservar"
                        onPress={() =>
                            navigation.navigate('Reserva', {
                                data,
                            })
                        }
                    >
                        {' '}
                        Reservar
                    </ReservaButton>
                </FooterInfo>
            </Container>
        </Background>
    );
};

export default EventDetail;
