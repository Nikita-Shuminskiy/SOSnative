import {Heading, HStack, Spinner} from "native-base";
import React from "react";
import {colors} from "../../../assets/colors/colors";

export const Reconnect = () => {
    return <HStack space={2} position={'absolute'} w={'100%'} bottom={10} zIndex={10} alignItems={'center'}
                   justifyContent="center">
        <Spinner accessibilityLabel="Loading posts" size={'lg'}/>
        <Heading color="primary.500" fontWeight={'normal'} fontSize="lg">
            Reconnect
        </Heading>
    </HStack>
}