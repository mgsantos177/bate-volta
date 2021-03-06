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
    margin: 10px 30px 10px 30px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 10px;
`;

export const SignLink = styled.TouchableOpacity`
    margin-top: 20px;
`;

export const SignLinkText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;

export const TopText1 = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 23px;
    margin-bottom: 10px;
`;

export const TopText2 = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 18px;
`;

export const TopView = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 25px 10px 10px 10px;
`;
