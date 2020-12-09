import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
    Container,
    User,
    Avatar,
    Info,
    NameEvent,
    Name,
    VerPerfil,
    Text,
    Separator,
} from './styles';
import Background from '../../components/Background/home';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '../../store/modules/auth/actions';
import api from '../../services/api';
const Profile = () => {
    const profile = useSelector((state) => state.user.profile);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';

    const [userData, setUserData] = useState();

    async function getUserDetails() {
        const response = await api.get(`/users/${profile.id}`);
        setUserData(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            getUserDetails();
        }
    }, [isFocused]);

    function handleLogout() {
        dispatch(signOut());
    }
    return (
        <Background>
            <Container>
                <User>
                    <Avatar
                        source={{
                            uri:
                                userData && userData.avatar
                                    ? `${baseURL}/${userData.avatar}`
                                    : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                        }}
                    />

                    <Info>
                        <NameEvent>
                            {userData ? userData.name : profile.name}
                        </NameEvent>
                        <Name>{userData ? userData.email : profile.email}</Name>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ProfileDetails', {
                                    userData,
                                })
                            }
                        >
                            <VerPerfil>Ver Perfil</VerPerfil>
                        </TouchableOpacity>
                    </Info>
                </User>

                <Separator />
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('History', {
                            userId: userData.id,
                        })
                    }
                >
                    <User>
                        <Icon name="stars" size={30} color={'#0388e0'} />
                        <Text>Meu Historico</Text>
                    </User>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity
                    onPress={() => navigation.navigate('My Events')}
                >
                    <User>
                        <Icon name="today" size={30} color={'#0388e0'} />
                        <Text>Meus Eventos</Text>
                    </User>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity onPress={() => {}}>
                    <User>
                        <Icon name="help-outline" size={30} color={'#0388e0'} />
                        <Text>Ajuda</Text>
                    </User>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
                    <User>
                        <Icon name="info-outline" size={30} color={'#0388e0'} />
                        <Text>Sobre</Text>
                    </User>
                </TouchableOpacity>
                <Separator />
                <TouchableOpacity onPress={handleLogout}>
                    <User>
                        <Icon name="exit-to-app" size={30} color={'red'} />
                        <Text>Sair</Text>
                    </User>
                </TouchableOpacity>
            </Container>
        </Background>
    );
};

export default Profile;
