import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    margin:40px 20px 5px 0px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Hour = styled.Text``;

export const QuestionLink = styled.TouchableOpacity`
    bottom:30;
    align-self:center;  
`;
export const QuestionLinkText = styled.Text`
    
    font-weight: 600;
    font-size: 20px;
    color: #2678e2;
`;
