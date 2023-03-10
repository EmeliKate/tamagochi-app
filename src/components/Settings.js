import {useSelector, useDispatch} from "react-redux";
import {changeFeed, changeSleep, changeSocial, setFeed, setSleep, setSocial} from "../features/needs/needsSlice";
import {store} from "../app/store";
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {
    toggleSound,
    setGameSpeed,
    toggleShowModal,
    toggleActiveMode, toggleGame, toggleRestartVisible
} from "../features/settings/settingsSlice"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {

    const {soundOn} = useSelector((store) => store.settings)
    const {gameSpeedCoefficient} = useSelector((store) => store.settings)
    const {modalVisible} = useSelector((store) => store.settings)
    const {onActiveOnlyModeOn} = useSelector((store) => store.settings)
    const {maxNeedValue} = useSelector((store) => store.needs)
    const dispatch = useDispatch()

    const gameSpeedCoefficientMultiplier = 2.78316
    const maxGameSpeedCoefficient = 60

    const saveData = async (key, savedInt) => {
        try {
            await AsyncStorage.setItem(key, savedInt.toString())
            console.log(key + " is saved as " + savedInt)
        } catch (e) {
            console.log('Failed to save the data to the storage: ' + e)
        }
    }

    const speedName = () => {
        switch (Math.round(gameSpeedCoefficient)){
            case 1: return "1";
            case Math.round(gameSpeedCoefficientMultiplier): return "2";
            case Math.round(Math.pow(gameSpeedCoefficientMultiplier, 2)): return "3";
            case Math.round(Math.pow(gameSpeedCoefficientMultiplier, 3)): return "4";
            case Math.round(Math.pow(gameSpeedCoefficientMultiplier, 4)): return "5"
        }
    }

    const changeSpeed = () => {
        if (gameSpeedCoefficient >= maxGameSpeedCoefficient){
            dispatch(setGameSpeed(1))
        } else {
            dispatch(setGameSpeed(gameSpeedCoefficient*gameSpeedCoefficientMultiplier))
        }
        saveData("gameSpeedCoefficient", gameSpeedCoefficient)
    }

    const startGame = () => {
        dispatch(toggleShowModal())
    }

    const restartGame = () => {
        dispatch(setFeed(maxNeedValue))
        dispatch(setSleep(maxNeedValue))
        dispatch(setSocial(maxNeedValue))
        dispatch(toggleShowModal())
    }

    return(
        <Modal visible={modalVisible} style={styles.settings}>
            <View style={{backgroundColor:'#F7BAC9', flex:1}}>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={startGame} style={styles.button}>
                        <Text style={styles.buttonLabel}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={restartGame} style={styles.button}>
                        <Text style={styles.buttonLabel}>Restart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={changeSpeed} style={styles.button}>
                        <Text style={styles.buttonLabel}>{"Speed: " + speedName()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(toggleActiveMode())} style={styles.button}>
                        <Text style={styles.buttonLabel}>{onActiveOnlyModeOn ? "Play in the background: no":"Play in the background: yes"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(toggleSound())} style={styles.button}>
                        <Text style={styles.buttonLabel}>{soundOn ? "Sound: on" : "Sound: off"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}

export default Settings;

const styles = StyleSheet.create({
    settings: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: '#F7BAC9',
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    button: {
        backgroundColor: "rgb(164, 149, 141)",
        padding: 5,
        borderRadius: 20,
        borderColor:"rgb(77, 43, 25)",
        borderWidth: 4,
        margin: 10
    },
    buttonLabel: {
        color: "rgb(77, 43, 25)",
        fontFamily: "monospace",
        textAlign: "center"
    },
    buttons: {
        margin: 50,
    }
})