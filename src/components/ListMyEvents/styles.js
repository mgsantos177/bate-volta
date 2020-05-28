import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 15px;
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
    align-items: center;
`;

export const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    align-items: center;
    border-radius: 20px;
`;

export const Info = styled.View`
    margin-left: 15px;
`;

export const Name = styled.Text`
    font-weight: bold;
    font-size: 14px;
    color: #000;
`;

export const QtdeReservas = styled.Text`
    color: #999;
    font-size: 13px;
    margin-top: 2px;
`;

export const Time = styled.Text`
    font-size: 13px;
    margin-top: 2px;
`;
