import React from 'react'
import {StyleProp, TextStyle, View, Text} from "react-native";
import {colors} from "../assets/colors/colors";

type EmptyListProps = {
	text: string
	height?: number
	onPressLink: () => void
	styleLink?: StyleProp<TextStyle>
	styleText?: StyleProp<TextStyle>
}
const EmptyList = ({ text, onPressLink, styleText, styleLink, height }: EmptyListProps) => {

	return (
		<View style={{ alignItems: 'center', height, justifyContent: 'center', flex: 1, width: '100%' }}>
			<Text style={{fontSize: 20, color: colors.green}}>
				{text}
			</Text>
		</View>
	)
}

export default EmptyList
export const renderEmptyContainer = (height, text) => {
	const onPressLink = () => {

	}
	return (
		<EmptyList
			height={height}
			text={text}
			onPressLink={onPressLink}
		/>
	)
}
