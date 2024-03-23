import React, {memo, useCallback, useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet, TouchableOpacity, Modal} from "react-native";
import {Camera, CameraType, FlashMode} from "expo-camera";
import {Box, Image} from "native-base";
import closeCameraImg from "../../assets/images/closeBlack.png";
import turnImg from "../../assets/images/turnWhite.png";
import btnCamera from "../../assets/images/blue-circle.png";
import {colors} from "../../assets/colors/colors";
import * as ImagePicker from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons";

type CameraModalProps = {
    onClose: () => void
    updatePhotoHandler: (val: string) => void
    visible: boolean
}
const CameraModal = ({onClose, visible, updatePhotoHandler}: CameraModalProps) => {
    const [cameraType, setCameraType] = useState<CameraType>(CameraType.back)
    const [ratio, setRatio] = useState<string>('4:3')
    const {height, width} = Dimensions.get('window');
    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] = useState(false);
    const cameraRef = useRef(null)
    const [flashMode, setFlashMode] = React.useState<FlashMode>(FlashMode.off)
    const onGalleryHandler = useCallback(async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!')
            return
        }
        onClose()
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
            })

            if (!result.canceled) {
                const selectedAsset = result.assets[0]
                const selectedImageUri = selectedAsset.uri
                updatePhotoHandler(selectedImageUri)
            }
        } catch (error) {
            console.log('Error selecting image from gallery:', error)
        }
    }, [])
    const takePicture = useCallback(async () => {
        try {
            const photo = await cameraRef.current.takePictureAsync()
            updatePhotoHandler(photo.uri)
        } catch (e) {
            console.log(e, 'takePicture')
        }
    }, [])

    const changeCameraType = useCallback(() => {
        setCameraType(cameraType === CameraType.front ? CameraType.back : CameraType.front)
    }, [cameraType])

    const prepareRatio = async () => {
        // set the camera ratio and padding.
        // this code assumes a portrait mode screen
        let desiredRatio = '4:3';
        if (Platform.OS === 'android') {
            const ratios = await cameraRef.current.getSupportedRatiosAsync()

            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const parts = ratio.split(':');
                const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
                realRatios[ratio] = realRatio;
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio;
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance;
            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // set the preview padding and preview ratio
            console.log(desiredRatio)
            setRatio(desiredRatio);
            // Set a flag so we don't do this
            // calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };
    const setCameraReady = useCallback(async () => {
        console.log('setCameraReady')
        if (!isRatioSet) {
            await prepareRatio();
        }
    }, [isRatioSet]);
    const flashModeHandler = useCallback(() => {
        if (flashMode === FlashMode.torch) {
            setFlashMode(FlashMode.off)
        } else if (flashMode === FlashMode.off) {
            setFlashMode(FlashMode.torch)
        }
    }, [flashMode])
    return (
        <Modal style={styles.container} visible={visible}>
            <Camera type={cameraType}
                    style={[styles.camera, {backgroundColor: colors.black}]}
                    onCameraReady={setCameraReady}
                    ratio={ratio}
                    flashMode={flashMode}
                    ref={cameraRef}>
                <Box borderRadius={50} w={50} h={50} alignItems={'center'} justifyContent={'center'}
                     position={'absolute'}
                     top={'5%'}
                     right={5}
                     backgroundColor={flashMode === FlashMode.off ? '#000' : '#fff'}>
                    <TouchableOpacity
                        onPress={flashModeHandler}
                    >
                        <Ionicons name='flashlight' size={30} color={colors.blue}/>
                    </TouchableOpacity>
                </Box>
                <Box position={'absolute'} top={'5%'} left={5}>
                    <TouchableOpacity onPress={() => {
                        onClose()
                        setCameraType(CameraType.back)
                    }}>
                        <Image source={closeCameraImg} alt={'delete'}/>
                    </TouchableOpacity>
                </Box>
                <Box flexDirection={'row'} mb={2} w={'100%'} alignItems={'center'} justifyContent={'space-evenly'}>
                    <Box>
                        <TouchableOpacity
                            style={styles.btnGallery}
                            onPress={onGalleryHandler}>
                        </TouchableOpacity>
                    </Box>
                    <Box>
                        <TouchableOpacity onPress={takePicture}>
                            <Image alt={'btn'} source={btnCamera}/>
                        </TouchableOpacity>
                    </Box>
                    <Box>
                        <TouchableOpacity
                            onPress={changeCameraType}
                        >
                            <Image alt={'btn'} source={turnImg}/>

                        </TouchableOpacity>
                    </Box>
                </Box>
            </Camera>
        </Modal>
    );
};
const styles = StyleSheet.create({
    camera: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btnGallery: {
        backgroundColor: colors.gray,
        opacity: 0.8,
        width: 50,
        height: 50,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.white
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    addPhotoButton: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
})
export default memo(CameraModal);
