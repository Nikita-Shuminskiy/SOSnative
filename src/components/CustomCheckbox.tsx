import {Image, StyleSheet, TouchableOpacity} from 'react-native'

import unActive from '../assets/Images/checkBoxNotActive.png'
import active from '../assets/Images/checkBoxActive.png'

type CustomCheckboxProps = {
    checked: boolean
    onPress?: () => void
}
const CustomCheckbox = ({checked, onPress}: CustomCheckboxProps) => {
    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
            <Image source={checked ? active : unActive} style={styles.checkboxImage}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxContainer: {
        width: 20,
        height: 20,
    },
    checkboxImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
})
export default CustomCheckbox