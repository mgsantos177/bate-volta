import styled from 'styled-components/native';
import Button from '../../../components/Button';

export const Container = styled.View`
    flex: 1;
`;

export const Content = styled.View`
    flex: 1;
    padding-left: 10;
    padding-top: 10;
    margin-left: 5;
`;

export const Image = styled.Image`
    width: 100%;
    height: 250px;
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

export const CancelButton = styled(Button)`
    padding: 20px;
    width: 180px;
    background: red;
`;

export const UpdateButton = styled(Button)`
    padding: 20px;
    width: 180px;
`;

export const DateInfo = styled.Text`
    font-size: 15px;
    font-weight: 900;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(204, 204, 204, 0.2);
    margin: 10px 0 10px;
`;

export const EventInfo = styled.View`
    align-items: flex-start;
    margin-bottom: 30px;
`;

export const Sessions = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const MoreInfo = styled.View`
    flex-direction: row;
    align-items: flex-start;
`;

export const TitleInfo = styled.Text`
    margin-right: 5px;
    font-weight: bold;
`;

export const Info = styled.Text``;
