import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../../../../../../../components/Background/home';

import {
    Container,
    TextInput,
    SubmitButton,
    TitleText,
    Question,
} from './styles';
import api from '../../../../../../../services/api';

const Responder = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation();

    const [text, setText] = useState('');

    async function sendQuestion() {
        try {
            const response = await api.post(`/event/comments/answer`, {
                comentario: text,
                id: data.id,
            });

            await navigation.navigate('Manager', {
                data,
            });

            await Alert.alert('Sucesso', 'Pergunta realizada');
        } catch (error) {
            Alert.alert('Erro', err.response.data.error);
        }
    }

    console.tron.log(data);
    return (
        <Container>
            <TitleText>Pergunta:</TitleText>
            <Question>{data.comentario}</Question>
            <TextInput
                multiline={true}
                value={text}
                onChangeText={setText}
                numberOfLines={10}
                textAlignVertical="top"
                placeholder={`${data.User.name} está aguardando sua resposta :)`}
            />

            <SubmitButton onPress={sendQuestion}> Enviar</SubmitButton>
        </Container>
    );
};

export default Responder;
