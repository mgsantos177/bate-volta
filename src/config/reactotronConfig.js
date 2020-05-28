import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
    const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
        .configure({ host: '172.18.62.1' })
        .useReactNative()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

    console.tron = tron;

    tron.clear();
}
