import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../../services/api'

import { Container, Title, QtdeText, QtdeContainer, QtdeButton, QtdeInput, SubmitButton } from './styles';
import { Text, Alert } from 'react-native';

const UpdateAppointment = ({ route }) => {

  const { data } = route.params;
  const navigation = useNavigation();
  const [valueReserva, setValueReserva] = useState(data.qtde_reservas);

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

  async function update() {
    try {
      const response = await api.put('reserva', {
        id: data.id,
        qtde_reservas: valueReserva,
      });
      await Alert.alert('Sucesso', 'Reserva atualizada com sucesso');
      await navigation.navigate('Appointment');
    } catch (err) {

      Alert.alert('Erro', err.response.data.error);
    }

  }


  return (
    <Container>

      <Title>{data.Event.name}</Title>

      <QtdeText>Atualize a Quantidade de Reservas:</QtdeText>
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

      <SubmitButton onPress={update}>
        Atualizar Reservar
      </SubmitButton>
    </Container>
  )
}

export default UpdateAppointment;
