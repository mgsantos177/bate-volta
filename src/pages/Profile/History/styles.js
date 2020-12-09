import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    margin-top: 30px;
    padding: 20px;

`;

export const Avatar = styled.Image`
    margin-top: 15px;
    width: 130px;
    height: 130px;
    border-radius: 65px;
    align-self: center;
`;

export const ListOptions = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(204, 204, 204, 0.2);
    margin: 10px 0 10px;
`;

export const Text = styled.Text`
    margin-left: 10px;
    font-weight: 600;
    font-size: 16px;
    color: #333;
`;

export const InfoArea = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 10px;
`;

export const TextInfo = styled.Text`
    font-weight: 800;
    font-size: 18px;
`;

export const NameText = styled.Text`
    font-weight: 800;
    font-size: 20px;
    color: #0388e0;
`;
