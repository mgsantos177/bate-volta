import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Avatar,
    Left,
    Info,
    Name,
    QtdeReservas,
    Time,
} from './styles';
import praia from '../../assets/praia.jpg';

const ListMyEvents = ({ data }) => {
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';
    const navigation = useNavigation();

    const dateParsed = useMemo(() => {
        return formatRelative(parseISO(data.data_inicio), new Date(), {
            locale: pt,
        });
    }, [data.data_inicio]);

    return (
        <Container>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('My Event Details', {
                        data,
                    });
                }}
            >
                <Left>
                    <Avatar
                        source={{
                            uri: data.images[0]
                                ? `${baseURL}/${data.images[0]}`
                                : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                        }}
                    />
                    <Info>
                        <Name>{data.name}</Name>
                        <Time>{dateParsed}</Time>
                        <QtdeReservas>
                            Lugares Disponiveis: {data.lugares_disponiveis}
                        </QtdeReservas>
                    </Info>
                </Left>
            </TouchableOpacity>
        </Container>
    );
};

export default ListMyEvents;
