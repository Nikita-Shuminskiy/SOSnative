import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text} from "react-native";
import PatientDashboard from "./PatientDashboard";
import InputFieldsChat from "../../../../components/InputFieldsChat";
import SocketStore from "../../../../store/SocketStore/socket-store";
import {Box} from "native-base";
import {DataJoinRoomType, MessagePayloadType, VolunteerToolboxType} from "../../../../store/SocketStore/type";
import VolunteerDashboard from "./VolunteerDashboard";

type FooterChatProps = {
    isVolunteer: boolean
    messagesLength?: number
    onSendMessage: (payload: MessagePayloadType) => void
    joinedRoomData: DataJoinRoomType
    toolboxVolunteer: VolunteerToolboxType[]
}
const FooterChat = memo(({isVolunteer,toolboxVolunteer, joinedRoomData, onSendMessage, messagesLength}: FooterChatProps) => {
    const onTypingHandler = useCallback(() => {
        SocketStore?.typingHandler()
    }, [])
    return (
        <>
            {
                isVolunteer && <VolunteerDashboard toolboxVolunteer={toolboxVolunteer} onSendMessage={onSendMessage}/>
            }

            <Box style={{
                height: isVolunteer ? 60 : 150,
                backgroundColor: 'rgba(223,233,255,0.97)',
                position: 'relative',
                bottom: 0
            }}>

                {
                    !isVolunteer && <>
                        {
                            !messagesLength && <Text style={styles.text}>Your current condition</Text>
                        }
                        <PatientDashboard joinRoom={joinedRoomData}/>
                    </>
                }

                <InputFieldsChat
                    onTypingHandler={onTypingHandler}
                    onSendMessage={onSendMessage}/>
            </Box>
        </>
    );
})

const styles = StyleSheet.create({
    text: {
        color: '#9BB5E9',
        fontSize: 13,
        fontWeight: 'normal',
        textAlign: 'center'
    },
})

export default FooterChat;
