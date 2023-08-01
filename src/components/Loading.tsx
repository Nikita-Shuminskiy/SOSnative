import React from 'react'
import {Modal, View} from "react-native";
import Loaders from 'react-native-pure-loaders';

const Loading = ({ visible }) => {
    return (
        <Modal transparent={true} visible={visible}>
           <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
               <Loaders.Ellipses color={'blue'} />
           </View>
        </Modal>
    )
}
export default Loading
