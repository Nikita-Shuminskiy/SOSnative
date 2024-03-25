import {Audio} from "expo-av";
import outSms from '../assets/sounds/outSms.mp3'
import inboxSms from '../assets/sounds/inboxesSms.mp3'
import presBtnSound from '../assets/sounds/pressBtn.mp3'

export enum PlaySoundData {
    out = outSms,
    inbox = inboxSms,
    press = presBtnSound,
}

const playSound = async (audio: PlaySoundData) => {
    try {
        const {sound} = await Audio.Sound.createAsync(audio)
        await sound.playAsync();
    } catch (error) {
        console.log('error loading sound', error);
    }
}
export {playSound}