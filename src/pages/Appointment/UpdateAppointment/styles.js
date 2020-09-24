import styled from 'styled-components/native';
import Button from '../../../components/Button';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    margin-bottom: 40px;
    align-items:center;
    justify-content:center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight:bold;
`

export const SubmitButton = styled(Button)`
    align-self: stretch;
    margin: 10px 5px 0 10px;
    align-self:center;
    width:90%;
`;

export const QtdeContainer = styled.View`
    flex-direction: row;
    display: flex;
    align-items: baseline;
`;

export const QtdeButton = styled(RectButton)`
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    padding: 10px;
    margin-right: 5px;
`;

export const QtdeInput = styled.TextInput`
    border-radius: 4px;
    font-weight: bold;
    font-size: 16px;
    padding: 6px 6px 0 6px;
    width: 30px;
    height: 35px;
    background: transparent;
    align-items: baseline;
    align-self: center;
    color: #000;
`;

export const QtdeText = styled.Text`
    margin-top: 50px;
    font-size: 18px;
    font-weight: bold;
`;
