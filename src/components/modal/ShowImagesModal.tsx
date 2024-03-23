import React from 'react'
import {Image, ImageBackground, Pressable, StyleSheet} from 'react-native'
import {Box, Modal} from 'native-base'
import closeImg from '../../assets/images/closeBlack.png'
import ArrowBack from "../ArrowBack";

type BaseModalProps = {
    visible: boolean
    image: string
    onClose: () => void
}

const ShowImagesModal = ({visible, onClose, image}: BaseModalProps) => {
    return (
        <Modal isOpen={visible} onClose={onClose}>
            <Pressable onPress={onClose} style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                zIndex: 10
            }}/>

            <ImageBackground resizeMode={'contain'} resizeMethod={'resize'} style={styles.img} source={{uri: image}}>
                 <Box style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: 3
            }}>
                {/*<ArrowBack styleImg={styles.closeBtn} img={closeImg} goBackPress={onClose}/>*/}
            </Box>
            </ImageBackground>
        </Modal>
    )
}
const styles = StyleSheet.create({
    closeBtn: {
        width: 41,
        height: 41,
        position: 'absolute',
        top: 100,
        right: 20
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        zIndex: 3
    }
})
export default ShowImagesModal
