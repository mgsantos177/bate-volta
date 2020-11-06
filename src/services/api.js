import axios from 'axios';
import { signOut } from '../store/modules/auth/actions';

const FormData = require('form-data');

const api = axios.create({
    baseURL: 'http://localhost:3332',
});

api.registerInterceptWithStore = (store) => {
    // api.interceptors.response.use(
    //     (response) => {},
    //     (error) => {
    //         if (error.response.data.error === 'Token invalido') {
    //             store.dispatch(signOut());
    //         } else {
    //             return error;
    //         }
    //     }
    // );
};

export default api;
