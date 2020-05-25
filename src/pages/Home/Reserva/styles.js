import styled from 'styled-components/native';
import Button from '../../../components/Button';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export const Background = styled(LinearGradient).attrs({
    colors: ['#fff', '#fff'],
})`
    flex: 1;
`;

export const Container = styled.View`
    flex: 1;
    padding: 0 30px;
    justify-content: flex-start;
    align-items: center;
    margin-top: 100px;
    background: white;
`;

export const Avatar = styled.Image`
    width: 120px;
    height: 120px;
    border-radius: 50px;
`;

export const Name = styled.Text`
    margin-top: 10px;
    font-size: 20px;
    font-weight: bold;
`;

export const Time = styled.Text`
    margin-top: 4px;
    font-size: 18px;
`;

export const SubmitButton = styled(Button)`
    align-self: stretch;
    margin-top: 10px;
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

export const Separator = styled.View`
    height: 1px;
    background: rgba(204, 204, 204, 0.2);
    margin: 10px 0 10px;
`;
