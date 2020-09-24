import React, { useState, useRef } from 'react';
import { Image, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-native-phone-input';

import Background from '../../components/Background/index';
import img from '../../vendor/img/bus_blue.png';

import DataInput from '../../components/DataInput';
import { signUpRequest } from '../../store/modules/auth/actions';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();

    const cpfRef = useRef();
    const dataNascRef = useRef();
    const telefoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [date, setDate] = useState();
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function changeTel(num) {
        const formatNum = num.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        setTelefone(formatNum);
    }

    function changeCPF(num) {
        const formatNum = num.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );
        setCpf(formatNum);
    }

    const loading = useSelector((state) => state.auth.loading);

    function handleSubmit() {
        const cpfString = cpf.toString();
        const telString = telefone.toString();
        const dataNascConv = date;

        dispatch(
            signUpRequest(
                name,
                cpfString,
                dataNascConv,
                telString,
                email,
                password
            )
        );
    }

    return (
        <Background>
            <Container>
                <Image source={img} style={{ width: 175, height: 175 }} />
                <Form>
                    <FormInput
                        icon="person"
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholder="Nome Completo"
                        onSubmitEditing={() => cpfRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />
                    <FormInput
                        icon="subtitles"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="CPF"
                        ref={cpfRef}
                        value={cpf}
                        onChangeText={(num) => changeCPF(num)}
                    />

                    <DataInput
                        date={date}
                        onChange={setDate}
                        ref={dataNascRef}
                        onSubmitEditing={() => emailRef.current.focus()}
                    />

                    <FormInput
                        icon="phone"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Telefone"
                        onSubmitEditing={() => emailRef.current.focus()}
                        ref={telefoneRef}
                        value={telefone}
                        onChangeText={(num) => changeTel(num)}
                    />

                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="E-mail"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        ref={emailRef}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Senha"
                        ref={passwordRef}
                        value={password}
                        onSubmitEditing={handleSubmit}
                        onChangeText={setPassword}
                    />

                    <SubmitButton
                        loading={loading}
                        title="Cadastrar"
                        onPress={handleSubmit}
                    >
                        Cadastrar
                    </SubmitButton>
                </Form>
                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Voltar</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
