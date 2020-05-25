import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

const storage = AsyncStorage;

export default (reducers) => {
    const persistedReducer = persistReducer(
        {
            key: 'batevolta',
            storage,
            whitelist: ['auth', 'user'],
        },
        reducers
    );

    return persistedReducer;
};
