import {useDispatch} from "react-redux";
import {Button, View, StyleSheet, TouchableOpacity, Text, Image} from "react-native";
import {toggleShowModal} from "../features/settings/settingsSlice";

const SettingsButton = () => {

    const dispatch = useDispatch()

    return(
        <View style={styles.settingsBtnContainer}>
            <TouchableOpacity onPress={() => dispatch(toggleShowModal())}>
               <Image source={require("../assets/pics/settings.png")} style={styles.settingsPic}/>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsButton;

const styles = StyleSheet.create({
    settingsBtnContainer: {
        flex: 0.3,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        marginHorizontal: 75,
        // borderWidth: 4,
        // borderColor: '#20232a',
    },
    settingsPic: {
        width: 60,
        height: 60
    }

})