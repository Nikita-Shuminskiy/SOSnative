import React, {useState} from 'react';
import {
    ImageSourcePropType,
    KeyboardAvoidingView,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import {Image} from "native-base";

type ButtonProps = {
    onPress: () => void
    styleContainer?: StyleProp<any>
    styleText?: StyleProp<any>
    textBtn?: string
    activeOpacity?: number
    activeHover?: boolean
    img?: ImageSourcePropType
}
const Button = ({
                    textBtn,
                    onPress,
                    styleText,
                    activeOpacity,
                    styleContainer,
                    activeHover,
                    img
                }: ButtonProps) => {
    const [activeBtn, setActiveBtn] = useState(false)
    return (
        <KeyboardAvoidingView behavior="padding">
            <TouchableOpacity onPressIn={() => setActiveBtn(true)}
                              onPressOut={() => setActiveBtn(false)}
                              style={{
                                  backgroundColor: activeHover && activeBtn ? '#D5E3FE' : 'rgba(213,227,254,0)',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 8,
                                  height: 66, ...styleContainer
                              }} activeOpacity={activeOpacity ?? 1}
                              onPress={onPress}>
                {
                    img &&
                    <Image w={10} h={10} source={img} alt={'img'} />
                }
                {
                    textBtn &&  <Text style={{
                        fontWeight: '500',
                        fontSize: 18,
                        ...styleText,
                    }}>{textBtn}</Text>
                }

            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({});
export default Button;
