import AsyncStorage from "@react-native-async-storage/async-storage";
import SoundPlayer from "react-native-sound-player";

const playSound = (soundFileName) => {
    try {
        SoundPlayer.playSoundFile(soundFileName, 'mp3')
    } catch (e) {
        console.log(`cannot play the sound file`, e)
    }
}

const saveData = async (key, savedInt) => {
    try {
        await AsyncStorage.setItem(key, savedInt.toString())
        console.log(key + " is saved as " + savedInt)
    } catch (e) {
        console.log('Failed to save the data to the storage: ' + e)
    }
}

export {playSound, saveData}
