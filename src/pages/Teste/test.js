import React from 'react';
import { Image, Button, Text } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-community/google-signin';
import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk';
import img from '../../vendor/img/bus_blue.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import api from '../../services/api';
import { signInSuccess } from '../../store/modules/auth/actions';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Background from '~/components/Background';
import {
    Container,
    EmailPasswordButton,
    SignLink,
    SignLinkText,
    AreaButton,
    IconArea,
} from './styles';
import {
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native-gesture-handler';

GoogleSignin.configure({
    webClientId:
        '241409991996-0c5gqh4q63ecrjdbjgfjdeph2ncqcaue.apps.googleusercontent.com',
    offlineAccess: true,
});

function FirebaseSignIn() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    validateToken = async (idToken) => {
        const resp = await api.post('/sessions2', { idToken });

        if (resp.data.token) {
            const { user, token } = resp.data;
            console.log('logar');
            api.defaults.headers.Authorization = `Bearer ${token}`;
            dispatch(signInSuccess(token, user));
        } else {
            const { email, name } = resp.data;
            await navigation.navigate('SignUpFirebase', {
                data: { email, name },
            });
            console.log('cadastrar');
        }
    };

    onGoogleButtonPress = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(googleCredential);

        const { token } = await auth().currentUser.getIdTokenResult();

        await validateToken(token);
    };

    onFacebookButtonPress = async () => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions([
            'public_profile',
            'email',
        ]);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken
        );

        // Sign-in the user with the credential

        await auth().signInWithCredential(facebookCredential);

        const { token } = await auth().currentUser.getIdTokenResult();

        await validateToken(token);
    };

    return (
        <Background>
            <Container>
                <Image
                    source={img}
                    style={{ width: 175, height: 175, marginBotton: 20 }}
                />

                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <AreaButton style={{}}>
                        <IconArea>
                            {' '}
                            <Icon2
                                style={{ margin: '50px' }}
                                name="email"
                                size={20}
                                color="#fff"
                                margin="50px"
                            ></Icon2>{' '}
                        </IconArea>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                            Continuar com Email e Senha
                        </Text>
                    </AreaButton>
                </TouchableOpacity>

                <TouchableOpacity onPress={onGoogleButtonPress}>
                    <AreaButton style={{ backgroundColor: '#fff' }}>
                        <IconArea>
                            {' '}
                            <Icon2
                                style={{ margin: '50px' }}
                                name="google"
                                size={20}
                                color="red"
                                margin="50px"
                            ></Icon2>
                        </IconArea>
                        <Text style={{ fontWeight: 'bold', color: '#333' }}>
                            Continuar com Google
                        </Text>
                    </AreaButton>
                </TouchableOpacity>

                <TouchableOpacity onPress={onFacebookButtonPress}>
                    <AreaButton style={{ backgroundColor: '#0000ff' }}>
                        <IconArea>
                            <Icon2
                                style={{ margin: '50px' }}
                                name="facebook"
                                size={20}
                                color="#fff"
                                margin="50px"
                            ></Icon2>
                        </IconArea>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                            Continuar com Facebook
                        </Text>
                    </AreaButton>
                </TouchableOpacity>
                {/* <GoogleSigninButton
                    title="Google Sign-In"
                    onPress={() =>
                        onGoogleButtonPress().then(() =>
                            console.log('Signed in with Google!')
                        )
                    }
                />
                <Button
                    title="Facebook Sign-In"
                    onPress={() =>
                        onFacebookButtonPress().then(() =>
                            console.log('Signed in with Facebook!')
                        )
                    }
                />

                <EmailPasswordButton
                    onPress={() => navigation.navigate('SignInEmail')}
                >
                    Login com Email e Senha
                </EmailPasswordButton> */}

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

export default FirebaseSignIn;
