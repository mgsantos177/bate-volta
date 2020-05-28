import React from 'react';
import { View } from 'react-native';
import Background from '../../../components/Background/home';
import { Container, Avatar } from './styles';

const ProfileDetails = () => {
    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri:
                            'https://api.adorable.io/avatars/285/abott@adorable.png',
                    }}
                />

            </Container>
        </Background>
    );
};

export default ProfileDetails;
