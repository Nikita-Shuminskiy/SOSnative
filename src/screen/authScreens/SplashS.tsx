import React from 'react';
import LottieView from "lottie-react-native";
import splashImage from '../../assets/images/lottie/splash1.json'
import {Box} from "native-base";
import {observer} from "mobx-react-lite";

const SplashS = observer(() => {
    return (
        <Box style={{
            flex: 1,
        }}>
            <LottieView source={splashImage}
                        style={{width: '100%', height: '100%'}} loop autoPlay/>
        </Box>
    );
})

export default SplashS;