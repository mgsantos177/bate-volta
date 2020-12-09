import styled from 'styled-components/native';

export const Content = styled.View`
    flex: 1;
    margin: 20px 0 10px;
    padding: 20px;
    border-radius: 4px;
    background: aliceblue;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const Left = styled.View`
    display: flex;
    flex-direction: row;
`;

export const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`;

export const Info = styled.View`
    margin-left: 15px;
    display: flex;
    flex: 1;
`;

export const NameEvent = styled.Text`
    font-weight: bold;
    font-size: 15px;
    color: #333;
    width: 100%;
    display: flex;
`;

export const Name = styled.Text`
    font-weight: 600;
    font-size: 14px;
    color: #333;
`;

export const Time = styled.Text`
    color: #999;
    font-weight: 600;
    font-size: 14px;
`;

export const List = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 },
})``;

export const SignLink = styled.TouchableOpacity`
    margin-top: 1px;
`;

export const SignLinkText = styled.Text`
    color: #0388e0;
    font-weight: bold;
    font-size: 16px;
`;
