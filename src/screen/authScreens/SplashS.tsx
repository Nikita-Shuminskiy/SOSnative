import React, {useEffect, useState} from 'react';
import LottieView from "lottie-react-native";
import splashImage from '../../assets/images/lottie/splash.json'
import iconSOS from '../../../assets/icon.png'
import {observer} from "mobx-react-lite";
import rootStore from "../../store/RootStore/root-store";
import {routerConstants} from "../../constants/routerConstants";
import {BaseWrapperComponent} from "../../components/baseWrapperComponent";
import * as Animatable from "react-native-animatable";
import {Box} from "native-base";

const SplashS = observer(({navigation}) => {
    const {AuthStoreService, AuthStore, SocketStore} = rootStore
    const {isAuth, user} = AuthStore
    const {checkActiveSession} = SocketStore
    const [activeSession, setActiveSession] = useState(false)

    useEffect(() => {
        AuthStoreService.getUser()
        checkActiveSession().then((data) => {
            if(data) return setActiveSession(true)
            setActiveSession(false)
        })
    }, []);

    const onAnimationFinish = () => {
        if (isAuth) {
            if(activeSession) return navigation.navigate(routerConstants.CHAT)

            navigation.navigate(user.role === 'volunteer' ? routerConstants.DASHBOARD : routerConstants.NEED_HELP)
            return
        }
        navigation.navigate(routerConstants.LOGIN)
    }
    return (
        <BaseWrapperComponent>
            <Animatable.View animation={'zoomIn'} style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Animatable.Image style={{width: '100%', height: '100%', flex: 1}} animation={'pulse'} easing={'ease-in'}
                                  iterationCount={10} source={iconSOS}/>
                <Box style={{width: '70%', height: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <LottieView source={splashImage}
                                duration={4000}
                                loop={false}
                                onAnimationFinish={onAnimationFinish}
                                autoPlay/>
                </Box>
            </Animatable.View>
        </BaseWrapperComponent>
    );
})

export default SplashS;