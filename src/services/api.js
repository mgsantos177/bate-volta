import axios from 'axios';
import { signOut } from '../store/modules/auth/actions';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3333',
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
