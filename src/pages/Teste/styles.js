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
    margin: 30px 30px 10px 30px;
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

export const EmailPasswordButton = styled(Button)`
    margin-bottom: 20px;
    padding: 10px;
`;

export const AreaButton = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 300px;
    height: 40px;
    border-radius: 10px;
    background-color: #999;
    margin-bottom: 10px;
`;

export const IconArea = styled.Text`
    margin: 0 30px 0 15px;
`;
