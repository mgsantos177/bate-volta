import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    margin-top: 0px;
    padding: 20px;
`;

export const TitleView = styled.View`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`;

export const TitleArea = styled.View`
    align-items: center;
    margin-left: auto;
    margin-right: auto;
`;

export const IconArea = styled.View``;

export const Title = styled.Text`
    display: flex;
    align-items: flex-start;
    font-size: 20px;
    font-weight: bold;
`;

export const Content = styled.View`
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 100%;
    border-width: 0.5px;
    border-color: #ddd;
    margin-bottom: 10px;
`;

export const Image = styled.Image`
    display: flex;
    width: 100%;
    height: 200px;
`;

export const Info = styled.View`
    display: flex;
    align-content: space-between;
    margin-right: 10px;
    margin-top: 10px;
`;

export const OwnerInfo = styled.View`
    flex-direction: row;
    align-items: baseline;
`;

export const Owner = styled.Text`
    font-size: 13px;
    font-weight: 600;
`;

export const Name = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

export const DateText = styled.Text`
    margin-top: 10px;
    font-size: 15px;
    font-weight: 900;
`;

export const PriceInfo = styled.View`
    flex-direction: row;
    align-items: baseline;
    margin: 0px 0 5px;
`;

export const Price = styled.Text`
    font-size: 18px;
    font-weight: bold;
`;

export const PriceText = styled.Text`
    font-size: 18px;
    font-weight: 800;
`;
