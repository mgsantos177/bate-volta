import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 10px;
`;

export const DateButton = styled.TouchableOpacity`
    padding: 0 15px;
    width: 100%;
    height: 46px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
`;

export const DateText = styled.Text`
    font-size: 14px;
    color: #fff;
    margin-left: 15px;
`;
