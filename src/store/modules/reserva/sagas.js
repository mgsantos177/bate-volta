import { Alert } from 'react-native';
import { takeLatest, call, all } from 'redux-saga/effects';
import api from '../../../services/api';

export function* signIn({ payload }) {
    const { event, qtde_reservas } = payload;
    try {
        const response = yield call(api.post, 'reserva', event, qtde_reservas);

        Alert.alert('Sucesso', 'Reserva Criada com sucesso');
    } catch (err) {
        Alert.alert('Erro', 'Erro ao realizar a reserva');
    }
}

export default all([takeLatest('@reserva/CREATE_APPOINTMENT', signIn)]);
