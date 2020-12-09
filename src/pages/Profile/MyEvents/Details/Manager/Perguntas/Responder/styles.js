import styled from 'styled-components/native';
import Button from '../../../../../../../components/Button';

export const Container = styled.View`
    flex: 1;
    padding-left: 10px;
    padding-top: 50px;
    margin-left: 5px;
    margin-bottom: 40px;
`;

export const TextInput = styled.TextInput`
    margin: 10px 10px 0 0;
    font-size: 18px;
    background: #fff;
    padding: 10px;
    border-bottom-color: #999;
`;

export const SubmitButton = styled(Button)`
    margin: 10px 10px 0 0;
`;

export const TitleText = styled.Text`
    font-size: 25px;
    font-weight: 600;
    color: #000;
`;

export const Question = styled.Text`
    margin-top: 7px;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    margin-left: 15px;
`;
