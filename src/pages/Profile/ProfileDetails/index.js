import React, { useRef, useState } from 'react';
import Background from '../../../components/Background/home';
import DataInput from '../../../components/DataInput';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Avatar,
    Title,
    Form,
    FormInput,
    SubmitButton,
    Separator,
} from './styles';
import api from '../../../services/api';

const ProfileDetails = ({ route }) => {
    const { userData } = route.params;

    const loading = useSelector((state) => state.auth.loading);

    const cpfRef = useRef();
    const dataNascRef = useRef();
    const telefoneRef = useRef();
    const emailRef = useRef();

    const [date, setDate] = useState();
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    async function handleSubmit() {}

    console.tron.log(userData);
    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri:
                            'https://api.adorable.io/avatars/285/abott@adorable.png',
                    }}
                />
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
                        onSubmitEditing={handleSubmit}
                        ref={emailRef}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <SubmitButton
                        loading={loading}
                        title="Cadastrar"
                        onPress={handleSubmit}
                    >
                        Cadastrar
                    </SubmitButton>
                </Form>
            </Container>
        </Background>
    );
};

export default ProfileDetails;
