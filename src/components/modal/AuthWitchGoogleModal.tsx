import React from 'react'
import {Pressable, StyleSheet} from 'react-native'
import {Box, Modal, Text} from 'native-base'
import closeImg from '../../assets/images/closeBlack.png'
import ArrowBack from "../ArrowBack";
import Link from "../Link";
import {RoleEnum} from "../../api/type";
import {colors} from "../../assets/colors/colors";

type BaseModalProps = {
    visible: boolean
    onClose: () => void
    onPress: (role: RoleEnum) => void
}

const AuthWitchGoogleModal = ({visible, onClose, onPress}: BaseModalProps) => {
    return (
        <Modal isOpen={visible} onClose={onClose}>
            <Pressable onPress={onClose} style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(31,130,152,0.31)'
            }}/>

            <Box maxWidth={220} maxH={130} h={'100%'} w={'100%'} borderRadius={16} p={2} alignItems={'center'} justifyContent={'space-evenly'} backgroundColor={colors.white}>
                <Box alignItems={'flex-end'} position={'absolute'} right={2} top={0}>
                    <ArrowBack styleImg={styles.closeBtn} img={closeImg} goBackPress={onClose}/>
                </Box>
                <Link styleText={styles.textLink} text={'I\'m a volunteer'} onPress={() => onPress(RoleEnum.VOLUNTEER)}/>
                <Link styleText={styles.textLink} text={'I\'m a patient'} onPress={() => onPress(RoleEnum.PATIENT)}/>
            </Box>
        </Modal>
    )
}
const styles = StyleSheet.create({
    textLink: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: '500'
    },
    closeBtn: {
        width: 31,
        height: 31,
    },
    img: {
        position: 'relative',
        maxWidth: 271,
        width: '100%',
        height: 400,
        borderRadius: 16
    }
})
export default AuthWitchGoogleModal
