import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

const Category = ({ name, imageUri, filtro }) => {
    const navigation = useNavigation();
    return (
        <TouchableHighlight
            onPress={() =>
                navigation.navigate('Categoria', {
                    filtro,
                })
            }
            underlayColor="white"
        >
            <View
                style={{
                    height: 130,
                    width: 115,
                    marginLeft: 20,
                    borderWidth: 0.5,
                    borderColor: '#dddddd',
                }}
            >
                <View style={{ flex: 2 }}>
                    <Image
                        source={imageUri}
                        style={{
                            flex: 1,
                            width: null,
                            height: null,
                            resizeMode: 'cover',
                        }}
                    />
                </View>

                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text>{name}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

export default Category;
