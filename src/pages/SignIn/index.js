import React, { useRef, useState } from 'react';
import { Image, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background/index';
import { signInRequest } from '../../store/modules/auth/actions';
import img from '../../vendor/img/bus_blue.png';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

export default function SignIn() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const passwordRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loading = useSelector((state) => state.auth.loading);

    function handleSubmit() {
        dispatch(signInRequest(email, password));
    }

    return (
        <Background>
            <Container>
                <Image
                    source={img}
                    style={{ width: 175, height: 175, marginBotton: 20 }}
                />
                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton
                        loading={loading}
                        title="Acessar"
                        onPress={handleSubmit}
                    >
                        Acessar
                    </SubmitButton>
                </Form>
                <SignLink onPress={() => navigation.navigate('SignUp')}>
                    <SignLinkText>
                        <Icon
                            style={{ margin: '50px' }}
                            name="assignment-ind"
                            size={20}
                            color="#fff"
                            margin="50px"
                        ></Icon>{' '}
                        Criar Conta Gratuita
                    </SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
