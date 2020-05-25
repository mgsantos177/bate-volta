import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
    height: 46px;
    background: #07063a;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const Text = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;
