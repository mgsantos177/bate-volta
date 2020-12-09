import React, { useState } from 'react';
import { View, Text, Button, Alert, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Picker } from '@react-native-community/picker';
import Modal from 'react-native-modal';

import DataInput from '../../components/DataInput2';

import cep from 'cep-promise';

import Background from '../../components/Background/home';

import {
    Container,
    TextInput,
    Label,
    Separator,
    CategoryName,
    TextInputSelect,
    TextModal,
    ModalContent,
    AddPhoto,
    PhotoContent,
    EventImages,
    ModalOptions,
    ButtonArea,
    ButtonEvent,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '~/services/api';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: [],
            nome: '',
            descricao: '',
            categoria: '',
            qtde: '',
            minQtde: '',
            cepDestino: '',
            enderecoDestino: '',
            numeroDestino: '',
            cidadeDestino: '',
            estadoDestino: '',
            cepPartida: '',
            enderecoPartida: '',
            numeroPartida: '',
            cidadePartida: '',
            estadoPartida: '',
            veiculo: '',
            modeloVeiculo: '',
            placaVeiculo: '',
            corVeiculo: '',
            modalCamera: false,
            modalPhoto: false,
            photoClicked: '',
            dataPartida: '',
            dataRetorno: '',
            preco: '',
        };

        this.openGalery = this.openGalery.bind(this);
        this.openCamera = this.openCamera.bind(this);
        this.handlePhoto = this.handlePhoto.bind(this);
        this.findCep = this.findCep.bind(this);
        this.findCepPartida = this.findCepPartida.bind(this);
        this.clean = this.clean.bind(this);
        this.sendPhotos = this.sendPhotos.bind(this);
        this.createEvent = this.createEvent.bind(this);
    }

    async openGalery() {
        const { foto } = this.state;
        const images = await ImagePicker.openPicker({
            multiple: true,
        });

        const helper = foto;
        for (let image of images) {
            if (helper.length < 10) {
                const splitFileName = image.path.split('/');
                const fileName = splitFileName[splitFileName.length - 1];

                helper.push({ path: image.path, fileName, type: 'image/jpeg' });
            } else {
                Alert.alert('Erro', 'Maximo de 10 fotos');
            }
        }

        this.setState({ foto: helper, modalCamera: false });
    }

    async openCamera() {
        const { foto } = this.state;
        const image = await ImagePicker.openCamera({});
        const splitFileName = image.path.split('/');
        const fileName = splitFileName[splitFileName.length - 1];
        const helper = foto;

        helper.push({ path: image.path, fileName, type: 'image/jpeg' });

        this.setState({ foto: helper, modalCamera: false });
    }

    async handlePhoto() {
        const { photoClicked, foto } = this.state;
        const helper = [];
        for (let test of foto) {
            if (test.fileName !== photoClicked) {
                helper.push(test);
            }
        }
        this.setState({ foto: helper, modalPhoto: false });
    }

    async findCep(cepInput) {
        if (cepInput.length === 8) {
            try {
                const findCep = await cep(cepInput);
                this.setState({
                    cepDestino: cepInput,
                    cidadeDestino: findCep.city,
                    estadoDestino: findCep.state,
                    enderecoDestino: findCep.street,
                });
            } catch (error) {
                Alert.alert('Erro', 'Cep Não encontrado');
            }
        }
    }

    async findCepPartida(cepInput) {
        if (cepInput.length === 8) {
            try {
                const findCep = await cep(cepInput);
                this.setState({
                    cepPartida: cepInput,
                    cidadePartida: findCep.city,
                    estadoPartida: findCep.state,
                    enderecoPartida: findCep.street,
                });
            } catch (error) {
                Alert.alert('Erro', 'Cep Não encontrado');
            }
        }
    }

    async clean() {
        this.setState({
            foto: [],
            nome: '',
            descricao: '',
            categoria: '',
            qtde: '',
            minQtde: '',
            cepDestino: '',
            enderecoDestino: '',
            numeroDestino: '',
            cidadeDestino: '',
            estadoDestino: '',
            cepPartida: '',
            enderecoPartida: '',
            numeroPartida: '',
            cidadePartida: '',
            estadoPartida: '',
            veiculo: '',
            modeloVeiculo: '',
            placaVeiculo: '',
            corVeiculo: '',
            photoClicked: '',
        });
    }

    async sendPhotos(id) {
        const { foto } = this.state;

        const data = new FormData();

        for (let value of foto) {
            data.append('eventFiles', {
                uri: value.path,
                name: value.fileName,
                type: 'image/jpeg',
            });
        }

        data.append('event', id);

        const resp = await api.post('/events/files', data);
    }

    async createEvent() {
        const {
            nome,
            descricao,
            categoria,
            qtde,
            minQtde,
            cepDestino,
            enderecoDestino,
            numeroDestino,
            cidadeDestino,
            estadoDestino,
            cepPartida,
            enderecoPartida,
            numeroPartida,
            cidadePartida,
            estadoPartida,
            veiculo,
            modeloVeiculo,
            placaVeiculo,
            corVeiculo,
            dataPartida,
            dataRetorno,
            preco,
        } = this.state;

        const data = {
            name: nome,
            data_inicio: dataPartida,
            data_fim: dataRetorno,
            tempo_viagem: 'T02:00:00',
            descricao,
            categoria,
            qtde_participantes_min: minQtde,
            qtde_participantes_max: qtde,
            cep_destino: cepDestino,
            end_destino: `${enderecoDestino} ${numeroDestino}`,
            cidade_destino: cidadeDestino,
            estado_destino: estadoDestino,
            cep_partida: cepPartida,
            end_partida: `${enderecoPartida} ${numeroPartida}`,
            cidade_partida: cidadePartida,
            estado_partida: estadoPartida,
            tipo_veiculo: veiculo,
            modelo_veiculo: modeloVeiculo,
            placa_veiculo: placaVeiculo,
            cor_veiculo: corVeiculo,
            preco,
        };

        try {
            const resp = await api.post('/events', data);

            await this.sendPhotos(resp.data.id);

            Alert.alert('Sucesso', 'Evento criado com sucesso');
            await this.clean;
        } catch (error) {
            console.tron.log(error);
            Alert.alert('Erro', `${error}`);
        }
    }

    render() {
        let helperData1;

        let helperData2;

        const {
            foto,
            nome,
            preco,
            descricao,
            categoria,
            qtde,
            minQtde,
            cepDestino,
            enderecoDestino,
            numeroDestino,
            cidadeDestino,
            estadoDestino,
            cepPartida,
            enderecoPartida,
            numeroPartida,
            cidadePartida,
            estadoPartida,
            veiculo,
            modeloVeiculo,
            placaVeiculo,
            corVeiculo,
            modalCamera,
            modalPhoto,
            dataPartida,
            dataRetorno,
        } = this.state;

        if (dataPartida !== '') {
            helperData1 = dataPartida;
        }

        if (dataRetorno !== '') {
            helperData2 = dataRetorno;
        }

        return (
            <Background>
                <ScrollView>
                    <Container>
                        <PhotoContent>
                            <ScrollView horizontal={true}>
                                {foto &&
                                    foto.map((data) => (
                                        <TouchableOpacity
                                            key={data.fileName}
                                            onPress={() =>
                                                this.setState({
                                                    photoClicked: data.fileName,
                                                    modalPhoto: true,
                                                })
                                            }
                                        >
                                            <EventImages
                                                source={{
                                                    uri: data.path,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                {foto.length < 10 && (
                                    <AddPhoto
                                        onPress={() =>
                                            this.setState({
                                                modalCamera: true,
                                            })
                                        }
                                    >
                                        <Icon
                                            name="camera"
                                            size={30}
                                            color={'#0388e0'}
                                        />
                                        <Text>Adicionar Fotos</Text>
                                    </AddPhoto>
                                )}
                            </ScrollView>
                        </PhotoContent>
                        <Modal isVisible={modalCamera}>
                            <ModalContent>
                                <ModalOptions onPress={this.openCamera}>
                                    <Icon
                                        name="camera"
                                        size={30}
                                        color={'#0388e0'}
                                    />
                                    <TextModal>Tirar foto</TextModal>
                                </ModalOptions>
                                <ModalOptions onPress={this.openGalery}>
                                    <Icon
                                        name="image"
                                        size={30}
                                        color={'#0388e0'}
                                    />
                                    <TextModal>Escolher existente</TextModal>
                                </ModalOptions>
                                <ModalOptions
                                    onPress={() =>
                                        this.setState({
                                            modalCamera: false,
                                        })
                                    }
                                >
                                    <Icon
                                        name="close"
                                        size={30}
                                        color={'red'}
                                    />
                                    <TextModal>Cancelar</TextModal>
                                </ModalOptions>
                            </ModalContent>
                        </Modal>
                        <Modal isVisible={modalPhoto}>
                            <ModalContent>
                                <ModalOptions
                                    onPress={() => this.handlePhoto()}
                                >
                                    <Icon
                                        name="image-off"
                                        size={30}
                                        color={'#0388e0'}
                                    />
                                    <TextModal>Remover foto</TextModal>
                                </ModalOptions>
                                <ModalOptions
                                    onPress={() =>
                                        this.setState({ modalPhoto: false })
                                    }
                                >
                                    <Icon
                                        name="close"
                                        size={30}
                                        color={'red'}
                                    />
                                    <TextModal>Cancelar</TextModal>
                                </ModalOptions>
                            </ModalContent>
                        </Modal>
                        <Separator />
                        <CategoryName>Descreva seu Evento</CategoryName>
                        <Separator />
                        <Label>Titulo do Evento</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Praia de Santos"
                            onChangeText={(nome) => this.setState({ nome })}
                            defaultValue={nome}
                        />
                        <Label>Descrição</Label>
                        <TextInput
                            style={{ height: 120, textAlign: 'left' }}
                            placeholder="Ex: Excursão Praia de Santos com onibus confortavel e ar condicionado"
                            onChangeText={(descricao) =>
                                this.setState({ descricao })
                            }
                            defaultValue={descricao}
                            multiline={true}
                        />
                        <Label>Categoria</Label>

                        <Picker
                            style={{
                                borderColor: '#999',
                                borderStyle: 'solid',
                            }}
                            selectedValue={categoria}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ categoria: itemValue })
                            }
                        >
                            <Picker.Item label="Praias" value="praias" />
                            <Picker.Item label="Parques" value="parques" />
                            <Picker.Item label="Shows" value="shows" />
                            <Picker.Item label="Esportes" value="esportes" />
                            <Picker.Item label="Teatros" value="teatros" />
                            <Picker.Item
                                label="Experiencias"
                                value="experiencias"
                            />
                            <Picker.Item label="Outros" value="outros" />
                        </Picker>

                        <Label>Quantidade de Participantes</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="25"
                            onChangeText={(qtde) => this.setState({ qtde })}
                            defaultValue={qtde}
                            keyboardType={'numeric'}
                        />
                        <Label>Quantidade minima de Participantes</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="O minino de participantes pro evento acontecer"
                            onChangeText={(minQtde) =>
                                this.setState({ minQtde })
                            }
                            defaultValue={minQtde}
                            keyboardType={'numeric'}
                        />
                        <Label>Data de partida</Label>
                        <DataInput
                            text={'-                                     '}
                            onChange={(e) => {
                                console.tron.log(new Date(e));
                                this.setState({ dataPartida: new Date(e) });
                            }}
                            color={'#fff'}
                            colorIcon={'#000'}
                            style={{ height: 10 }}
                            date={helperData1}
                        />
                        <Label>Data de retorno</Label>
                        <DataInput
                            text={'-                                     '}
                            onChange={(e) => {
                                console.tron.log(e);
                                this.setState({ dataRetorno: new Date(e) });
                            }}
                            color={'#fff'}
                            colorIcon={'#000'}
                            style={{ height: 10 }}
                            date2={(e) => {
                                console.tron.log(e);
                            }}
                        />

                        <Label>Preço</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="80,00"
                            onChangeText={(preco) => this.setState({ preco })}
                            defaultValue={preco}
                            keyboardType={'numeric'}
                        />
                        <Separator />
                        <CategoryName>Endereço do Destino</CategoryName>
                        <Separator />
                        <Label>Cep</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="ex: 08152180"
                            onChangeText={(cep) => this.findCep(cep)}
                            defaultValue={cepDestino}
                            keyboardType={'numeric'}
                        />
                        <Label>Endereço</Label>
                        <TextInput
                            style={{ height: 40, color: '#000' }}
                            editable={false}
                            placeholder=""
                            defaultValue={enderecoDestino}
                        />
                        <Label>Número</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="ex: 450 A"
                            onChangeText={(numero) =>
                                this.setState({ numeroDestino: numero })
                            }
                            defaultValue={numeroPartida}
                            keyboardType={'numeric'}
                        />
                        <Label>Cidade e Estado</Label>
                        <TextInput
                            style={{ height: 40, color: '#000' }}
                            editable={false}
                            defaultValue={`${cidadeDestino} - ${estadoDestino}`}
                        />
                        <Separator />
                        <CategoryName>Local de Partida</CategoryName>
                        <Separator />
                        <Label>Cep</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Ex 08134950"
                            onChangeText={(cep) => this.findCepPartida(cep)}
                            defaultValue={cepPartida}
                        />
                        <Label>Endereço</Label>
                        <TextInput
                            style={{ height: 40, color: '#000' }}
                            editable={false}
                            placeholder=""
                            defaultValue={enderecoPartida}
                        />
                        <Label>Número</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Type here to translate!"
                            onChangeText={(numero) =>
                                this.setState({ numeroPartida: numero })
                            }
                            defaultValue={numeroPartida}
                        />
                        <Label>Cidade e Estado</Label>
                        <TextInput
                            style={{ height: 40, color: '#000' }}
                            editable={false}
                            defaultValue={`${cidadePartida} - ${estadoPartida}`}
                        />
                        <Separator />
                        <CategoryName>Informações do Veiculo</CategoryName>
                        <Separator />
                        <Label>Tipo de veiculo</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Ex: Ônibus Executivo"
                            onChangeText={(veiculo) =>
                                this.setState({ veiculo })
                            }
                            defaultValue={veiculo}
                        />
                        <Label>Modelo</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Volksvagen Kombi"
                            onChangeText={(modeloVeiculo) =>
                                this.setState({ modeloVeiculo })
                            }
                            defaultValue={modeloVeiculo}
                        />
                        <Label>Placa</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="FPG-2568"
                            onChangeText={(placaVeiculo) =>
                                this.setState({ placaVeiculo })
                            }
                            defaultValue={placaVeiculo}
                        />
                        <Label>Cor</Label>
                        <TextInput
                            style={{ height: 40 }}
                            placeholder="Branci"
                            onChangeText={(corVeiculo) =>
                                this.setState({ corVeiculo })
                            }
                            defaultValue={corVeiculo}
                        />
                        <ButtonArea>
                            <ButtonEvent
                                title="Limpar"
                                onPress={this.clean}
                                style={{ backgroundColor: 'red' }}
                            >
                                Limpar
                            </ButtonEvent>
                            <ButtonEvent
                                style={{ backgroundColor: '#0388e0' }}
                                title="Criar Evento"
                                onPress={this.createEvent}
                            >
                                Criar Evento
                            </ButtonEvent>
                        </ButtonArea>
                    </Container>
                </ScrollView>
            </Background>
        );
    }
}

export default Event;
