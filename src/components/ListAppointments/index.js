import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
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
    return (
        <Container>
            <TouchableOpacity onPress={() => {}}>
                <Left>
                    <Avatar source={praia} />
                    <Info>
                        <Name>{data.Event.name}</Name>
                        <Time>14/06/2018</Time>
                        <QtdeReservas>
                            Quantidade de Reservas: {data.qtde_reservas}
                        </QtdeReservas>
                    </Info>
                </Left>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => {}}>
                <Icon name="event" size={20} color="#f64c75" />
            </TouchableOpacity> */}
        </Container>
    );
};

export default ListAppointments;
