import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Title, TitleDesc, List, AllEventsButton } from './styles';
import Category from '../../components/Explore/category';

import praia from '../../assets/praia.jpg';
import parque from '../../assets/parque.jpg';
import experiencias from '../../assets/experiencias.jpg';
import esportes from '../../assets/esportes.jpg';
import museu from '../../assets/museu.jpg';
import natureza from '../../assets/natureza.jpg';
import teatro from '../../assets/teatro.png';
import shows from '../../assets/shows.jpg';
import Events from '../../components/Events';
import api from '~/services/api';

const Home = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [events, setEvents] = useState([]);
    const profile = useSelector((state) => state.user.profile);
    const nameHelper = profile.name.split(' ');

    async function loadEvents() {
        const response = await api.get('/events?limit=5');
        setEvents(response.data);
    }

    useEffect(() => {
        if (isFocused) {
            loadEvents();
        }
    }, [isFocused]);

    return (
        <ScrollView scrollEventThrottle={16}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >
                <Title>
                    Qual vai ser o Bate & Volta de hoje, {nameHelper[0]} ?
                </Title>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white',
                        paddingTop: 10,
                        borderTopWidth: 1,
                        borderTopColor: '#dddddd',
                        marginTop: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: '700',
                            paddingHorizontal: 20,
                        }}
                    >
                        Navegue por Categoria
                    </Text>

                    <View style={{ height: 130, marginTop: 20 }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            marginHorizontal={5}
                        >
                            <Category
                                imageUri={praia}
                                name="Praias"
                                filtro="praias"
                            />
                            <Category
                                imageUri={parque}
                                name="Parques"
                                filtro="parques"
                            />
                            <Category
                                imageUri={shows}
                                name="Shows"
                                filtro="shows"
                            />
                            <Category
                                imageUri={esportes}
                                name="Esportes"
                                filtro="esportes"
                            />
                            <Category
                                imageUri={teatro}
                                name="Teatro"
                                filtro="teatro"
                            />
                            <Category
                                imageUri={natureza}
                                name="Natureza"
                                filtro="natureza"
                            />
                            <Category
                                imageUri={experiencias}
                                name="Experiencias"
                                filtro="experiencias"
                            />
                            <Category
                                imageUri={museu}
                                name="Outros"
                                filtro="outros"
                            />
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: '700' }}>
                            Proximos Eventos
                        </Text>
                        <Text
                            style={{
                                fontWeight: '100',
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        >
                            Caso esteja a procura de algo pra já ;)
                        </Text>
                        <List
                            data={events}
                            keyExtractir={(item) => item.id}
                            renderItem={({ item }) => <Events data={item} />}
                        />
                        <AllEventsButton
                            onPress={() =>
                                navigation.navigate('Categoria', {
                                    filtro: '',
                                })
                            }
                        >
                            Mais Eventos
                        </AllEventsButton>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Home;
