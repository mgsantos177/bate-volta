import React, { useRef, useState, useCallback, useEffect } from 'react';

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
import { Alert, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileDetails = ({ route }) => {
    let userData = route.params.userData;

    const isFocused = useIsFocused();

    async function getUserDetails() {
        const response = await api.get(`/users/${userData.id}`);

        userData = response.data;

        setAllData(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            getUserDetails();
        }
    }, [isFocused]);

    // const userDate = new Date(allData.data_nasc);

    const [allData, setAllData] = useState([]);
    const [avatarPhoto, setAvatar] = useState('');
    const [date, setDate] = useState(new Date(userData.data_nasc));
    const [name, setName] = useState(userData.name);
    const [cpf, setCpf] = useState(userData.cpf);
    const [telefone, setTelefone] = useState(userData.telefone);
    const [email, setEmail] = useState(userData.email);

    const loading = useSelector((state) => state.auth.loading);
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';
    const cpfRef = useRef();
    const dataNascRef = useRef();
    const telefoneRef = useRef();
    const emailRef = useRef();
    const dispatch = useDispatch();
    const navigation = useNavigation();

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
            async (response) => {
                if (response.didCancel) {
                    return;
                }

                if (response.error) {
                    Alert.alert('Erro ao Atualizar seu avatar');

                    return;
                }

                const data = new FormData();

                data.append('file', {
                    uri: response.uri,
                    name: response.fileName,
                    type: 'image/jpeg',
                });

                await api.post('/files', data);

                await getUserDetails();
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
                data_nasc: dataNascConv,
                telefone: telString,
                email,
            })
        );

        await navigation.navigate('profile', {
            userData,
        });
    }

    return (
        <Background>
            <ScrollView>
                <Container>
                    <TouchableOpacity onPress={handleUpdateAvatar}>
                        <Avatar
                            source={{
                                uri: allData.avatar
                                    ? `${baseURL}/${allData.avatar}`
                                    : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                            }}
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
                            editable={false}
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
                            value={
                                allData.dataNasc ? allData.dataNasc : new Date()
                            }
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
            </ScrollView>
        </Background>
    );
};

export default ProfileDetails;
