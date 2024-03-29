import React from 'react'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {Dimensions, GestureResponderEvent, Platform, SafeAreaView, View} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {VirtualizedList} from "./virtualized-list";

type BaseWrapperComponentType = {
    children: JSX.Element | JSX.Element[]
    onTouchStart?: (event: GestureResponderEvent) => void
    onTouchEnd?: (event: GestureResponderEvent) => void
    isKeyboardAwareScrollView?: boolean
    styleSafeArea?: any
    isBackdrop?: boolean
}
export const BaseWrapperComponent = ({
                                         children,
                                         onTouchEnd,
                                         onTouchStart,
                                         isKeyboardAwareScrollView = false,
                                         styleSafeArea,
                                         isBackdrop = false,
                                     }: BaseWrapperComponentType) => {


    const checkOnBackDrop = () => {
        return (
            isBackdrop ? <LinearGradient
                colors={['#89BDE7', '#7EA7D9']}
                style={{flex: 1, width: '100%'}}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps={'handled'}
                    contentContainerStyle={{
                        marginBottom: 5,
                        width: '100%',
                    }}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {children}
                </KeyboardAwareScrollView>
            </LinearGradient> : (
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        keyboardShouldPersistTaps={'handled'}
                        contentContainerStyle={{
                            flexGrow: 1,
                            marginBottom: 5,
                            width: '100%',
                        }}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        {children}
                    </KeyboardAwareScrollView>

            )
        )
    }
    return (
        <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 10 : 40, ...styleSafeArea}}>
            {isKeyboardAwareScrollView ? (
                checkOnBackDrop()
            ) : (
                children
            )}
        </SafeAreaView>
    )
}
