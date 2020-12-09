import React, { useMemo } from 'react';
import { View, DatePickerAndroid } from 'react-native';
import { format, subYears } from 'date-fns';
import { pt } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, DateButton, DateText } from './styles';

const DataInput = ({ date, onChange, color, text, colorIcon }) => {
    let dataFormatted;
    if (date) {
        dataFormatted = useMemo(
            () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
            [date]
        );
    }

    async function handleOpenPicker() {
        const { action, year, month, day } = await DatePickerAndroid.open({
            mode: 'spinner',

            date,
        });

        if (action === DatePickerAndroid.dateSetAction) {
            const selectedDate = new Date(year, month, day);
            onChange(selectedDate);
        }
    }

    return (
        <Container>
            <DateButton
                onPress={handleOpenPicker}
                style={{ backgroundColor: color || 'rgba(0, 0, 0, 0.1)' }}
            >
                <Icon name="event" color={colorIcon || '#fff'} size={20} />
                <DateText style={colorIcon && { color: colorIcon }}>

                    {date ? dataFormatted : text}
                </DateText>
            </DateButton>
        </Container>
    );
};

export default DataInput;
