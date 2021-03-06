import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '../../../services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, telefone, data_nasc, email } = payload.data;

        const profile = { name, telefone, data_nasc, email };

        const response = yield call(api.put, 'users', profile);
        Alert.alert('Sucesso!', 'Perfil atualizado com sucesso');

        yield put(updateProfileSuccess(profile));
    } catch (error) {
        Alert.alert('Erro!', 'Verifique seus dados');
        // yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
