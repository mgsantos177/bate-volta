import styled from 'styled-components/native';
import Button from '../../../../components/Button';


export const Container = styled.View`
    flex: 1;
    margin:40px 10px 50px 10px;
`;

export const TextInput = styled.TextInput`
    margin-top:20px;
    font-size: 18px;
    background: #fff;
    border-bottom-color: #999;
    border-width: 0.5;
    
`;

export const SubmitButton = styled(Button)`
    margin-top:15px;

`;
