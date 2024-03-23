import React from 'react'
import { Box, Text } from 'native-base'
import ArrowBack from './ArrowBack'

type HeaderGoBackTitleProps = {
	goBackPress: () => void
	title: string
}
const HeaderGoBackTitle = ({ goBackPress, title }: HeaderGoBackTitleProps) => {
	return (
		<Box flexDirection={'row'}  alignItems={'center'} justifyContent={'center'}>
			<Box flex={1} position={'relative'} bottom={1}>
				<ArrowBack  goBackPress={goBackPress} />
			</Box>
			<Box flex={4} alignItems={'center'}>
				<Text fontSize={17}>{title}</Text>
			</Box>
			<Box flex={1} />
		</Box>
	)
}

export default HeaderGoBackTitle
