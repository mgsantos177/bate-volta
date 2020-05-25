import axios from 'axios';
import { signOut } from '../store/modules/auth/actions';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3333',
});

api.registerInterceptWithStore = (store) => {
    api.interceptors.response.use(
        (response) => {
            if (response.status === 401) {
                alert('You are not authorized');
            }
            return response;
        },
        (error) => {
            if (error.response.data.error === 'Token invalido') {
                store.dispatch(signOut());
            }
        }
    );
};

export default api;
