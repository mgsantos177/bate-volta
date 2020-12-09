import styled from 'styled-components/native';

export const Content = styled.View`
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 4px;
    background: aliceblue;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;

export const Left = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const Avatar = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const Info = styled.View`
    margin-left: 15px;
`;

export const NameEvent = styled.Text`
    font-weight: bold;
    font-size: 15px;
    color: #333;
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

export const Separator = styled.View`
    height: 1px;
    background: #999;
    margin: 15px 0 10px;
    display: flex;
    width: 100%;
    flex-direction: column;
`;

export const TextEmpty = styled.Text`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: auto;
    font-weight: bold;
    font-size: 16px;
`;
