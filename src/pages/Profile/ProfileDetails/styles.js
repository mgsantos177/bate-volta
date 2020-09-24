import styled from 'styled-components/native';
import DataInput from '../../../components/DataInput';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export const Container = styled.View`
    flex: 1;
    /* margin: 45px 15px 10px 15px; */
    padding: 20px;
    background: aliceblue;
    border-radius: 10px;

    .input {
        background: #0388e0;
    }
`;

export const Avatar = styled.Image`
    margin-top: 30px;
    width: 130px;
    height: 130px;
    border-radius: 65px;
    align-self: center;
`;

export const AvatarButton = styled.Button`
    background: transparent;
    border: 0;
`;

export const Form = styled.View`
    align-self: stretch;
    margin: 45px 10px 10px 10px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 15px;
    background: #0388e0;
`;

export const SubmitButton = styled(Button)`
    margin: 15px 15px 0 15px;
    background: #038;
`;

export const PasswordButton = styled(Button)`
    margin: 5px 15px 0 15px;
    background: red;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(204, 204, 204, 0.2);
    margin: 10px 0 10px;
`;

export const Data = styled(DataInput)`
    color: black !important;
`;
