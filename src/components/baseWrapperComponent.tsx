import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Dimensions, GestureResponderEvent, Platform, SafeAreaView, View} from 'react-native'

type BaseWrapperComponentType = {
	children: JSX.Element | JSX.Element[]
	onTouchStart?: (event: GestureResponderEvent) => void
	onTouchEnd?: (event: GestureResponderEvent) => void
	isKeyboardAwareScrollView?: boolean
}
export const BaseWrapperComponent = ({
	children,
	onTouchEnd,
	onTouchStart,
	isKeyboardAwareScrollView = false,
}: BaseWrapperComponentType) => {
	return (
		<SafeAreaView style={{flex:1, marginTop: 40}}>
				{isKeyboardAwareScrollView ? (
					<KeyboardAwareScrollView
						enableOnAndroid={true}
						keyboardShouldPersistTaps={'handled'}
						contentContainerStyle={{
							marginBottom: 10,
							width: '100%',
						}}
						onTouchStart={onTouchStart}
						onTouchEnd={onTouchEnd}
					>
						{children}
					</KeyboardAwareScrollView>
				) : (
					children
				)}
		</SafeAreaView>
	)
}
