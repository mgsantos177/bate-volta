import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 28px;
    color: black;
    font-weight: bold;
    align-self: flex-start;
    margin: 50px 0 0 20px;
`;

export const TitleDesc = styled.Text`
    font-size: 25px;
    color: black;
    font-weight: 600;
    align-self: flex-start;
    margin-left: 20px;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    contenteContainerStyle: { padding: 30 },
})``;

export const AllEventsButton = styled(Button)`
    margin-bottom: 20px;
`;
