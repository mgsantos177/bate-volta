import React, { useMemo } from 'react';
import { View } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableHighlight } from 'react-native';
import { Container, NameEvent, Left, Avatar, Info, Name, Time } from './styles';
import praia from '../../assets/praia.jpg';
import { useNavigation } from '@react-navigation/native';
const Events = ({ data }) => {
    const navigation = useNavigation();
    const baseURL = 'https://bate-volta.s3.us-east-2.amazonaws.com';

    const dateParsed = useMemo(() => {
        return formatRelative(parseISO(data.data_inicio), new Date(), {
            locale: pt,
        });
    }, [data.data_inicio]);

    return (
        <TouchableHighlight
            onPress={() =>
                navigation.navigate('Event Details', {
                    data,
                })
            }
            underlayColor="white"
        >
            <Container>
                <Left>
                    <Avatar
                        source={{
                            uri:
                                data.images.length > 0
                                    ? `${baseURL}/${data.images[0]}`
                                    : 'https://miro.medium.com/max/570/1*EelUYA6BOTNXtuRjSlaqHw.png',
                        }}
                    />

                    <Info>
                        <NameEvent>{data.name}</NameEvent>
                        <Name>com {data.User.name}</Name>
                        <Time>{dateParsed}</Time>
                    </Info>
                </Left>
            </Container>
        </TouchableHighlight>
    );
};

export default Events;
