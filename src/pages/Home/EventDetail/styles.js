import styled from 'styled-components/native';
import Button from '../../../components/Button';

export const Container = styled.View`
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 30px;
    font-weight: bold;
`;

export const OwnerInfo = styled.View`
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 10px;
`;

export const Owner = styled.Text`
    margin-right: 10px;
    font-size: 15px;
    font-weight: bold;
`;

export const DateInfo = styled.Text`
    font-size: 15px;
    font-weight: 900;
`;

export const EventInfo = styled.View`
    align-items: flex-start;
    margin-bottom: 40px;
`;

export const Sessions = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const MoreInfo = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-right: 10px;
`;

export const TitleInfo = styled.Text`
    margin-right: 5px;
    font-weight: bold;
    font-size: 15px;
`;

export const Info = styled.Text`
font-size: 14px;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(204, 204, 204, 0.2);
    margin: 10px 0 10px;
`;

export const FooterInfo = styled.View`
    border-top-width: 0.5px;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px;
    background: #fff;
    justify-content: space-between;
    position: absolute;
    margin-top: 50px;
    bottom: 0;
`;

export const Left = styled.View`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Price = styled.Text`
    font-weight: bold;
    font-size: 20px;
`;

export const ReservaButton = styled(Button)`
    padding: 20px;
    width: 180px;
`;
