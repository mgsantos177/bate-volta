import React, { useRef, useState, useCallback, useEffect } from 'react';

import axios from 'axios';

import ImagePicker from 'react-native-image-picker';
import Background from '../../../components/Background/home';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
    Container,
    Avatar,
    AvatarButton,
    Title,
    Form,
    FormInput,
    SubmitButton,
    PasswordButton,
    Separator,
    Data,
} from './styles';
import api from '../../../services/api';
import { updateProfileRequest } from '../../../store/modules/user/actions';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileDetails = ({ route }) => {
    let userData = route.params.userData;

    const isFocused = useIsFocused();

    async function getUserDetails() {
        const response = await api.get(`/user/${userData.id}`);

        userData = response.data;
    }

    useEffect(() => {
        if (isFocused) {
            getUserDetails();
        }
    }, [isFocused]);

    const loading = useSelector((state) => state.auth.loading);
    const baseURL = 'http://10.0.2.2:3333';
    const cpfRef = useRef();
    const dataNascRef = useRef();
    const telefoneRef = useRef();
    const emailRef = useRef();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const userDate = new Date(userData.data_nasc);

    const [date, setDate] = useState(userDate);
    const [name, setName] = useState(userData.name);
    const [cpf, setCpf] = useState(userData.cpf);
    const [telefone, setTelefone] = useState(userData.telefone);
    const [email, setEmail] = useState(userData.email);

    function changeCPF(num) {
        const formatNum = num.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );
        setCpf(formatNum);
    }

    function changeTel(num) {
        const formatNum = num.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        setTelefone(formatNum);
    }

    async function handleUpdateAvatar() {
        ImagePicker.showImagePicker(
            {
                title: 'Selecione um Avatar',
                cancelButtonTitle: 'Cancelar',
                takePhotoButtonTitle: 'Usar Camera',
                chooseFromLibraryButtonTitle: 'Escolha da Galeria',
            },
            async (responseUpdate) => {
                if (responseUpdate.didCancel) {
                    return;
                }

                if (responseUpdate.error) {
                    Alert.alert('Erro ao Atualizar seu avatar');
                    console.tron.log(responseUpdate);
                    return;
                }

                const cpfString = cpf.toString();
                const telString = telefone.toString();
                const dataNascConv = date;

                dispatch(
                    updateProfileRequest({
                        name,
                        cpf: cpfString,
                        data_nasc: dataNascConv,
                        telefone: telString,
                        email,
                        avatar_id: 17,
                    })
                );

                await navigation.navigate('profile', {
                    userData,
                });

                await this.getUserDetails();
            }
        );
    }

    async function handleSubmit() {
        const cpfString = cpf.toString();
        const telString = telefone.toString();
        const dataNascConv = date;

        dispatch(
            updateProfileRequest({
                name,
                cpf: cpfString,
                data_nasc: dataNascConv,
                telefone: telString,
                email,
                avatar_id: userData.avatar.id,
            })
        );

        await navigation.navigate('profile', {
            userData,
        });
    }

    return (
        <Background>
            <Container>
                <TouchableOpacity onPress={handleUpdateAvatar}>
                    <Avatar
                        source={{
                            uri: userData.avatar
                                ? `${baseURL}/files/${userData.avatar.path}`
                                : 'https://api.adorable.io/avatars/285/abott@adorable.png',
                        }}
                        on
                    />
                </TouchableOpacity>

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

                    <Data
                        date={date}
                        onChange={setDate}
                        ref={dataNascRef}
                        onSubmitEditing={() => emailRef.current.focus()}
                        color={'#0388e0'}
                        value={userData.dataNasc}
                    />

                    <SubmitButton
                        loading={loading}
                        title="Cadastrar"
                        onPress={handleSubmit}
                    >
                        Atualizar Dados
                    </SubmitButton>
                    <PasswordButton
                        loading={loading}
                        title="Cadastrar"
                        onPress={handleSubmit}
                    >
                        Alterar Senha
                    </PasswordButton>
                </Form>
            </Container>
        </Background>
    );
};

export default ProfileDetails;
