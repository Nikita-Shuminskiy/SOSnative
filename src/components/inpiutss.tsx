import React, {useRef} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';

import Animated, {useAnimatedStyle, useSharedValue, withTiming,} from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Ionicons';

const CustomTextInput = () => {
    const InputLength = useSharedValue({width: '100%'});
    const inputRef = useRef<any>(null);

    const SearchTextPlacement = useSharedValue({
        transformX: (Dimensions.get('window').width - 140) / 2,
    });

    const CancelBtn = useSharedValue({transformX: 100});

    const InputLengthStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(InputLength.value.width, {
                duration: 250,
            }),
        };
    });

    const SearchTextPlacementStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withTiming(SearchTextPlacement.value.transformX, {
                        duration: 250,
                    }),
                },
            ],
        };
    });

    const CancelBtnStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: withTiming(CancelBtn.value.transformX, {duration: 250})},
            ],
        };
    });

    const onFocus = () => {
        InputLength.value = {width: '90%'};
        SearchTextPlacement.value = {transformX: 0};
        CancelBtn.value = {transformX: 0};
    };

    const onCancelAnimation = () => {
        InputLength.value = {width: '100%'};
        SearchTextPlacement.value = {
            transformX: (Dimensions.get('window').width - 140) / 2,
        };
        CancelBtn.value = {transformX: 100};
        inputRef.current.blur();
    };

    return (
        <View style={styles.searchTopContainer}>
            {/* Added InputLengthStyles animated styles */}
            <Animated.View style={[styles.searchContainer, InputLengthStyles]}>
                {/* Added SearchTextPlacementStyles animated styles */}
                <Animated.View style={[styles.search, SearchTextPlacementStyles]}>
                    <Icon name="search-outline" size={18} style={styles.searchIcon}/>
                    {/* TextInput */}
                    <TextInput
                        placeholder={'Search'}
                        style={{fontSize: 16, paddingRight: 20}}
                        onFocus={onFocus}
                        ref={inputRef}
                    />
                </Animated.View>
            </Animated.View>

            {/* Cancel button */}
            {/* Added CancelBtnStyles animated styles */}
            <Animated.View style={[styles.cancelBtnContainer, CancelBtnStyles]}>
                <TouchableOpacity onPress={onCancelAnimation}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    searchTopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
    },
    searchContainer: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginTop: 14,
        borderRadius: 12,
    },
    search: {
        flexDirection: 'row',
    },
    searchIcon: {
        marginRight: 4,
    },
    cancelBtnContainer: {
        marginLeft: 5,
        marginTop: 10,
    },
});
