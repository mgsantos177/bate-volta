import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, TextInput, SubmitButton } from './styles';
import api from '../../../../services/api';

const NewQuestion = ({ route }) => {
    const data = route.params.event;
    const navigation = useNavigation();
    const [text, setText] = useState('');

    async function sendQuestion() {
        try {
            const response = await api.post(`/event/comments`, {
                comentario: text,
                event: data.id,
            });

            await navigation.navigate('Event Details', {
                data,
            });
            await Alert.alert('Sucesso', 'Pergunta realizada');
        } catch (error) {
            Alert.alert('Erro', err.response.data.error);
        }
    }

    return (
        <Container>
            <TextInput
                multiline={true}
                value={text}
                onChangeText={setText}
                numberOfLines={10}
                textAlignVertical="top"
                placeholder={'Escreva sua pergunta'}
            />

            <SubmitButton onPress={sendQuestion}> Enviar</SubmitButton>
        </Container>
    );
};

export default NewQuestion;
