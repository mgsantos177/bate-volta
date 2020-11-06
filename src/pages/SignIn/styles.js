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
    margin-bottom: 15px;
`;

export const SubmitButton = styled(Button)`
    margin: 15px;
`;

export const FacebookButton = styled(Button)`
    margin-top: 0px;
    width: 160px;
    height: 41px;
    background-color: #0000ff;
    margin-top: 3px;
    border-radius: 3px;
    margin-left: 10px;
`;

export const SignLink = styled.TouchableOpacity`
    margin-top: 10px;
`;

export const SignLinkText = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;

export const FirebaseLoginContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
`;
