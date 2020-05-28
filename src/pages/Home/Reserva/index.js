import React, { useMemo, useState } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import pt from 'date-fns/locale/pt';
import { Text, Alert } from 'react-native';
import Background from '../../../components/Background/home';
import {
    Container,
    Avatar,
    Time,
    Name,
    SubmitButton,
    QtdeContainer,
    QtdeButton,
    QtdeInput,
    Separator,
    QtdeText,
} from './styles';
import api from '~/services/api';

const Reserva = ({ route }) => {
    const { data } = route.params;
    const baseURL = 'http://10.0.2.2:3333';
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [valueReserva, setValueReserva] = useState(1);

    function increment() {
        if (valueReserva >= 5) {
            Alert.alert('Erro!', 'É permitido apenas 5 reservas por usuario');
        } else {
            setValueReserva(valueReserva + 1);
        }
    }

    function decrement() {
        if (valueReserva <= 1) {
        } else {
            setValueReserva(valueReserva - 1);
        }
    }

    async function criarReserva() {
        try {
            const response = await api.post('reserva', {
                event: data.id,
                qtde_reservas: valueReserva,
            });
            console.tron.log(response);
            await Alert.alert('Sucesso', 'Reserva Criada com sucesso');
            navigation.navigate('reservas');
        } catch (err) {
            console.tron.log(err);
            Alert.alert('Erro', err.response.data.error);
        }
    }

    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: data.EventFiles[0]
                            ? `${baseURL}/files/${data.EventFiles[0].path}`
                            : 'https://api.adorable.io/avatars/285/abott@adorable.png',
                    }}
                />
                <Name>{data.name}</Name>
                <Time>{data.data_inicio}</Time>
                <Time>Lugares disponiveis: {data.lugares_disponiveis}</Time>
                <Separator />

                <QtdeText>Selecione a Quantidade de Reservas:</QtdeText>
                <QtdeContainer>
                    <QtdeButton
                        onPress={() => {
                            decrement();
                        }}
                    >
                        <Text>
                            <Icon name="remove-circle-outline" size={25} />
                        </Text>
                    </QtdeButton>
                    <QtdeInput
                        editable={false}
                        value={valueReserva.toString()}
                        keyboardType="numeric"
                    />
                    <QtdeButton onPress={() => increment()}>
                        <Text>
                            <Icon name="add-circle-outline" size={25} />
                        </Text>
                    </QtdeButton>
                </QtdeContainer>

                <SubmitButton onPress={criarReserva}>
                    Confirmar Reservar
                </SubmitButton>
            </Container>
        </Background>
    );
};

export default Reserva;
