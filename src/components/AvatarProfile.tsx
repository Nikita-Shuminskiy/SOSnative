import React, {memo, useState} from 'react'
import {Avatar, Box, Image} from 'native-base'
import {TouchableOpacity} from 'react-native'
import {Camera} from "expo-camera";
import rootStore from "../store/RootStore/root-store";
import {colors} from "../assets/colors/colors";
import photoImg from '../assets/images/photoWhite.png'
import userMockAvatar from '../assets/images/user.png'
import ModalCamera from "./modal/ModalCamera";
import {UploadScope} from "../api/type";

type AvatarProfileProps = {
    photo: string
}
const AvatarProfile = memo(({photo}: AvatarProfileProps) => {
    const [isOpenCamera, setIsOpenCamera] = useState(false)
    const {AuthStoreService} = rootStore
    const [selectedImageUri, setSelectedImageUri] = useState<string>(photo)
    const savePhotoHandler = (photo: string) => {
        setSelectedImageUri(photo)
        setIsOpenCamera( false)
        AuthStoreService.sendUserPhoto(photo, UploadScope.AVATARS)
    }
    const getCameraPermission = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        return setIsOpenCamera(status === 'granted')
    }
    return (
        <>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={getCameraPermission}>
                <Box position={'absolute'} w={24} borderRadius={50} zIndex={10} top={0} opacity={0.3} h={24}
                     backgroundColor={colors.black}/>
                <Image alt={'photo'} w={6} h={6} position={'absolute'} zIndex={13} top={9} source={photoImg}/>
                <Avatar w={24} h={24} source={selectedImageUri ? {
                    uri: selectedImageUri,
                } : userMockAvatar}/>
            </TouchableOpacity>
            {isOpenCamera && (
                <ModalCamera visible={isOpenCamera}
                             updatePhotoHandler={savePhotoHandler}
                             onClose={() => setIsOpenCamera(false)}
                />
            )}
        </>
    )
})

export default AvatarProfile
