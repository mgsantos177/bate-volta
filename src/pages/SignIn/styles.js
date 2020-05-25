import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 0 30px;
`;

export const Form = styled.View`
    align-self: stretch;
    margin: 80px 30px 10px 30px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 15px;
`;

export const SubmitButton = styled(Button)`
    margin: 15px;
`;

export const SignLink = styled.TouchableOpacity`
    margin-top: 20px;
`;

export const SignLinkText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;
