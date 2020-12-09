import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
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

const ListAppointments = ({ data }) => {
    const navigation = useNavigation();
    console.tron.log(data);
    const dateParsed = useMemo(() => {
        return formatRelative(parseISO(data.Event.data_inicio), new Date(), {
            locale: pt,
        });
    }, [data.Event.data_inicio]);

    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Appointment Details', {
                    data: data,
                });
            }}
        >
            <Container>
                <Left>
                    <Avatar
                        source={{
                            uri: data.Event.images
                                ? `${baseURL}/${data.Event.images[0]}`
                                : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                        }}
                    />
                    <Info>
                        <Name>{data.Event.name}</Name>
                        <Time>{dateParsed}</Time>
                        <QtdeReservas>
                            Quantidade de Reservas: {data.qtde_reservas}
                        </QtdeReservas>
                    </Info>
                </Left>
            </Container>
        </TouchableOpacity>
    );
};

export default ListAppointments;
