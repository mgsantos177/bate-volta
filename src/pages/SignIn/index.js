import React from 'react';
import { Image, Button } from 'react-native';
import Background from '../../components/Background/index';

import img from '../../vendor/img/bus.png';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

export default function SignIn() {
    return (
        <Background>
            <Container>
                <Image source={img} style={{width: 120, height: 70}} />
                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                    />

                    <Button title="Acessar" onPress={() => {}} />
                </Form>
                <SignLink onPress={() => {}}>
                    <SignLinkText>Criar Conta Gratuita</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
