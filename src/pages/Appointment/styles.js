import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    align-self: center;
    margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 },
})``;

export const TextEmpty = styled.Text`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: auto;
    font-weight: bold;
    font-size: 16px;
`;
