import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateButton, DateText } from './styles';

const App = ({ color, text, colorIcon }) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    let dataFormatted;
    if (date) {
        dataFormatted = useMemo(
            () => format(date, "dd 'de' MMMM 'de' yyyy HH:mm", { locale: pt }),
            [date]
        );
    }

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);
            setMode('time');
            setShow(Platform.OS !== 'ios');
        } else {
            const selectedTime = selectedValue || new Date();
            setTime(selectedTime);
            setShow(Platform.OS === 'ios');
            setMode('date');
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={{ marginTop: 100 }}>
            <DateButton
                onPress={showDatepicker}
                style={{ backgroundColor: color || 'rgba(0, 0, 0, 0.1)' }}
            >
                <Icon name="event" color={colorIcon || '#fff'} size={20} />
                {/* <Text style={{ fontSize: 50 }}>{formatDate(date, time)}</Text> */}

                <DateText style={colorIcon && { color: colorIcon }}>
                    {date ? formatDate(date, time) : text}
                </DateText>
            </DateButton>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const formatDate = (date, time) => {
    return `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
};

export default App;
