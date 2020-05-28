import React from 'react';
import { Text } from 'react-native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import StartRating from 'react-native-star-rating';

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

const Details = ({ route }) => {
    const { data } = route.params;
    console.tron.log(data);

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

    return (
        <Container>
            <Image
                source={{
                    uri:
                        'https://api.adorable.io/avatars/285/abott@adorable.png',
                }}
            />
            <Content>
                <Title>{data.Event.name}</Title>
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
                <DateInfo>Retorno: {dateRetornoParsed}</DateInfo>
                <Owner>Você reservou 3 lugares nesse evento</Owner>
                <Separator />
                <EventInfo>
                    <Sessions>Descrição:</Sessions>
                    <Text>{data.Event.descricao}</Text>
                    <Separator />
                    <Sessions>Mais Informações:</Sessions>
                    <MoreInfo>
                        <TitleInfo>Local de Partida:</TitleInfo>
                        <Info>{data.Event.local_partida}</Info>
                    </MoreInfo>
                    <MoreInfo>
                        <TitleInfo>Endereço do Destino:</TitleInfo>
                        <Info>{data.Event.destino}</Info>
                    </MoreInfo>
                    <MoreInfo>
                        <TitleInfo>Tempo de viagem:</TitleInfo>
                        <Info>{data.Event.tempo_viagem} hrs</Info>
                    </MoreInfo>
                </EventInfo>
            </Content>
            <Separator />

            <FooterInfo>
                <UpdateButton
                    title="Reservar"
                    onPress={() =>
                        navigation.navigate('Reserva', {
                            data,
                        })
                    }
                >
                    {' '}
                    Alterar
                </UpdateButton>
                <CancelButton
                    title="Reservar"
                    onPress={() =>
                        navigation.navigate('Reserva', {
                            data,
                        })
                    }
                >
                    {' '}
                    Cancelar
                </CancelButton>
            </FooterInfo>
        </Container>
    );
};

export default Details;
