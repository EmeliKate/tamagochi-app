import {useDispatch, useSelector} from "react-redux";
import {store} from "../app/store";
import {View, StyleSheet, Modal, TouchableOpacity, Text} from "react-native";
import {toggleRestartVisible, toggleGame} from "../features/settings/settingsSlice";
import {setFeed, setSleep, setSocial} from "../features/needs/needsSlice";

const Restart = () => {

    const {restartVisible} = useSelector((store) => store.settings)
    const {maxNeedValue} = useSelector((store) => store.needs)
    const {firstLoad} = useSelector((store) => store.timer)
    const dispatch = useDispatch()

    if (firstLoad===false){

    }

    const restartGame = () => {
        dispatch(setFeed(maxNeedValue))
        dispatch(setSleep(maxNeedValue))
        dispatch(setSocial(maxNeedValue))
        dispatch(toggleGame())
        dispatch(toggleRestartVisible())
    }

    return(
        <Modal visible={restartVisible} style={styles.restart}>
            <View style={{backgroundColor:'#F7BAC9', flex:1}}>
                <Text style={styles.restartText}>
                    Game over :c
                </Text>
                <TouchableOpacity onPress={restartGame} style={styles.button}>
                    <Text style={styles.buttonLabel}>Restart</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default Restart

const styles = StyleSheet.create({
    restart: {
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
        marginHorizontal: 90,
        marginTop: 20
    },
    buttonLabel: {
        color: "rgb(77, 43, 25)",
        fontFamily: "monospace",
        textAlign: "center"
    },
    restartText:{
        marginHorizontal: 75,
        marginTop: 75,
        color: "purple",
        fontFamily: "monospace",
        fontSize: 20,
        textAlign: "center"
    }
})