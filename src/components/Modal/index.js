import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Modal from 'react-native-modal';
import {
    Container,
    Footer,
    Title,
    TitleOptions,
    ConfirmButtons,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DataInput from '../DataInput';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ModalTester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            data: [],
            cidade_destino: [],
            cidade_destino_filter: '',
            error: null,
            dataPartida: '',
            dataRetorno: '',
        };

        this.teste = this.teste.bind(this);
    }

    teste = async () => {};

    applyFilter = async () => {
        await this.props.applyFilter();

        this.setState({
            isModalVisible: !this.state.isModalVisible,
        });
    };

    cleanFilter = async () => {
        this.props.cidadeDestino('');
        this.props.dataPartida('');
        this.props.dataRetorno('');
        await this.props.cleanFilter();
        this.setState({
            dataPartida: '',
            dataRetorno: '',
            cidade_destino_filter: '',
        });
    };

    toggleModal = async () => {
        const data = this.props.data;
        const { cidade_destino } = this.state;

        for (let value of data) {
            const a = cidade_destino.includes(value.cidade_destino);

            if (!a) {
                cidade_destino.push(value.cidade_destino);
            }
        }

        this.setState({
            isModalVisible: !this.state.isModalVisible,
            cidade_destino,
        });
    };

    render() {
        let helperData1;
        if (this.state.dataRetorno !== '') {
            helperData1 = this.state.dataRetorno;
        }

        let helperData2;
        if (this.state.dataPartida !== '') {
            helperData2 = this.state.dataPartida;
        }

        return (
            <View style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <TouchableOpacity onPress={this.toggleModal}>
                    <Icon name="filter" size={30}></Icon>
                </TouchableOpacity>

                <Modal isVisible={this.state.isModalVisible}>
                    <Container>
                        <Title>Filtros</Title>
                        <TitleOptions>Cidade de Destino</TitleOptions>
                        <Picker
                            selectedValue={this.state.cidade_destino_filter}
                            style={{
                                height: 50,
                                width: 200,
                                lineHeight: 10,
                                marginBottom: 15,
                            }}
                            onValueChange={(itemValue, itemIndex) => {
                                this.props.cidadeDestino(itemValue);
                                this.setState({
                                    cidade_destino_filter: itemValue,
                                });
                            }}
                        >
                            <Picker.Item label="Selecione" value="" />
                            {this.state.cidade_destino.map((user) => (
                                <Picker.Item
                                    label={user}
                                    value={user}
                                    key={user}
                                />
                            ))}
                        </Picker>
                        <TitleOptions>Data de Partida</TitleOptions>
                        <DataInput
                            text={'-                                     -'}
                            onChange={(e) => {
                                this.setState({ dataPartida: e });
                                this.props.dataPartida(e);
                            }}
                            date={helperData2}
                            color={'#0388e0'}
                            style={{ height: '10px' }}
                        />
                        <TitleOptions>Data de Retorno</TitleOptions>
                        <DataInput
                            text={'-                                     -'}
                            color={'#0388e0'}
                            onChange={(e) => {
                                this.setState({ dataRetorno: e });
                                this.props.dataRetorno(e);
                            }}
                            date={helperData1}
                        />
                        <Footer>
                            <Button
                                title="Limpar"
                                onPress={this.cleanFilter}
                                color="#104568"
                            />

                            <Button
                                title="Aplicar"
                                onPress={this.applyFilter}
                            />
                        </Footer>
                    </Container>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
