import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';
import history from '../../../services/history';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        const { user, token } = response.data;

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSuccess(token, user));

        // history.push('/dashboards');
    } catch (err) {
        Alert.alert(
            'Falha na autenticação',
            'Houve um erro no login, verifique seus dados'
        );
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const {
            name,
            cpfString,
            dataNascConv,
            telString,
            email,
            password,
        } = payload;

        yield call(api.post, 'users', {
            name,
            cpf: cpfString,
            data_nasc: dataNascConv,
            telefone: telString,
            email,
            password,
        });

        // history.push('/');
    } catch (err) {
        Alert.alert('Erro!', 'Falha no cadastro, verifique seus dados!');

        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {
    history.push('/');
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
