import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateButton, DateText } from './styles';

const App = ({ onChange, color, text, colorIcon }) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const helperOnChange = (event, selectedValue) => {
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
            onChange(
                `${
                    date.getMonth() + 1
                }/${date.getDate()}/${date.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
            );
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
        <View>
            <DateButton
                onPress={showDatepicker}
                style={{ backgroundColor: color || 'rgba(0, 0, 0, 0.1)' }}
            >
                <Icon name="event" color={colorIcon || '#fff'} size={20} />
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
                    onChange={helperOnChange}
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
