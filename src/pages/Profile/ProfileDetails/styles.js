import styled from 'styled-components/native';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

export const Container = styled.View`
    flex: 1;
    margin-top: 30px;
    padding: 20px;
`;

export const Avatar = styled.Image`
    width: 130px;
    height: 130px;
    border-radius: 65px;
    align-self: center;
`;

export const Form = styled.View`
    align-self: stretch;
    margin: 80px 10px 10px 10px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 15px;
    background: #547475
`;

export const SubmitButton = styled(Button)`
    margin: 15px;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(204, 204, 204, 0.2);
    margin: 10px 0 10px;
`;
