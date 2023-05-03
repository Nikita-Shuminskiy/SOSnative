import React, {useRef, useState} from 'react';
import {Picker as Select} from '@react-native-picker/picker';

const Picker = () => {
    const [selectedLanguage, setSelectedLanguage] = useState()
    const pickerRef = useRef<any>();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    return <Select
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
        }>
        <Select.Item label="Java" value="java"/>
        <Select.Item label="JavaScript" value="js"/>
    </Select>
};

export default Picker;