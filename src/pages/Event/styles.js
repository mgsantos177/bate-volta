import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
    flex: 1;
    margin-top: 30px;
    padding: 20px;
`;

export const Label = styled.Text`
    font-size: 17px;
    font-weight: 700;
    color: #0388e0;
`;
export const TextInput = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
    padding: 0 15px;
    height: 50px;
    border-color: #999;
    border-width: 1px;
    border-radius: 5px;
    margin: 2px 0 8px 0;
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

export const CategoryName = styled.Text`
    color: #000;
    font-weight: 800;
    font-size: 23px;
`;

export const Separator = styled.View`
    height: 1px;
    background: rgba(204, 204, 204, 0.2);
    margin: 10px 0 10px;
`;

export const AddPhoto = styled.TouchableOpacity`
    border-color: #999;
    border-style: dotted;
    border-width: 1px;
    height: 285px;
    width: 350px;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const EventImages = styled.Image`
    border-width: 1px;
    height: 285px;
    width: 350px;
    margin: 5px;
    display: flex;
`;

export const PhotoContent = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    background-color: #fff;
    height: 150px;
    border-radius: 10px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
`;

export const ModalOptions = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 10px;
    background-color: #fff;
    height: 33%;
    width: 100%;
    border-color: #eee;
    border-style: solid;
    border-width: 1px;
`;

export const TextModal = styled.Text`
    color: #000;
    font-size: 15px;
    margin-left: 10px;
`;

export const ButtonArea = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ButtonEvent = styled(Button)`
    width: 45%;
    height: 40px;
    margin-left: 10px;
`;
