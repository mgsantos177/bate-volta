import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    margin-top: 30px;
    padding: 20px;
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

export const VerPerfil = styled.Text`
    font-size: 17px;
    color: #0388e0;
    margin-top: 5px;
`;

export const User = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const Avatar = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
`;

export const Info = styled.View`
    margin-left: 15px;
`;

export const NameEvent = styled.Text`
    font-weight: bold;
    font-size: 20px;
    color: #000;
`;

export const Name = styled.Text`
    font-weight: 600;
    font-size: 16px;
    color: #333;
`;

export const Time = styled.Text`
    color: #999;
    font-weight: 600;
    font-size: 14px;
`;
