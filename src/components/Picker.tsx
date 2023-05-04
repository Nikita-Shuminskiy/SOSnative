import React, {useRef, useState} from 'react';
import {Picker as Select} from '@react-native-picker/picker';
import {colors} from "../assets/colors/colors";

type PickerProps = {
    selectStyles?: any
}
const Picker = ({selectStyles}: PickerProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState()
    const pickerRef = useRef<any>();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    return <Select
        mode={'dialog'}
        style={{
            ...selectStyles,
            flex: 1
        }}
        dropdownIconColor={colors.blue}
        shouldRasterizeIOS={true}
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
        }>
        <Select.Item fontFamily={'Onest-light'} style={ {
            color: colors.blue,
            fontSize: 18
        }} label="English"
        value="English"/>
        <Select.Item fontFamily={'Onest-light'} style={ {
            color: colors.blue,
            fontSize: 18
        }} label="English"
                     value="English"/>
        <Select.Item fontFamily={'Onest-light'} style={ {
            color: colors.blue,
            fontSize: 18
        }} label="English"
                     value="English"/>
    </Select>
};

export default Picker;