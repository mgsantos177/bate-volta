import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
    display: flex;
    align-items: flex-start;
    padding: 30px;
    background-color: #fff;
    height: 500px;
    border-radius: 10px;
    margin-bottom: 100px;
`;

export const Footer = styled.View`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-left: auto;
    margin-top: 50px;
    flex-direction: row;
    color: beige;
`;

export const Title = styled.Text`
    font-size: 21px;
    font-weight: 600;
    margin-bottom: 25px;
`;

export const TitleOptions = styled.Text`
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 5px;
`;
