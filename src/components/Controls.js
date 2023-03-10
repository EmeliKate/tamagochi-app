import {useSelector, useDispatch} from "react-redux";
import {changeFeed, changeSocial, setFeed, setSocial, toggleSleep} from "../features/needs/needsSlice";
import {store} from "../app/store";
import {Button, StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import {saveData, playSound} from "../utils/utils";

const Controls = () => {

    const feedAddAmount = 30;
    const socialAddAmount = 40;
    const {maxNeedValue} = useSelector((store) => store.needs)
    const {feedNeed} = useSelector((store) => store.needs)
    const {socialNeed} = useSelector((store) => store.needs)
    const {isSleeping} = useSelector((store) => store.needs)
    const dispatch = useDispatch()

    const handleFeedButton = () => {
        playSound("sound")
        if (feedNeed+feedAddAmount > maxNeedValue){
            dispatch(setFeed(maxNeedValue))
        } else {
            dispatch(changeFeed(feedAddAmount))
        }
    }

    const handleTalkButton = () => {
        playSound("sound")
        if (socialNeed+socialAddAmount > maxNeedValue){
            dispatch(setSocial(maxNeedValue))
        } else {
            dispatch(changeSocial(socialAddAmount))
        }
    }

    return (
        <View style={styles.controls}>
            <TouchableOpacity onPress={handleFeedButton} disabled={isSleeping}>
                <Image source={require("../assets/pics/food.png")} style={styles.buttonPicFeed}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(toggleSleep())}>
                <Image source={require("../assets/pics/pillow.png")} style={styles.buttonPicSleep}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTalkButton} disabled={isSleeping}>
                <Image source={require("../assets/pics/heart.png")} style={styles.buttonPicTalk}/>
            </TouchableOpacity>
        </View>
    );
}

export default Controls;

const styles = StyleSheet.create({
    controls: {
        flex: 0.25,
        flexDirection: "row",
        marginHorizontal: 50,
        marginTop: 20,
        alignItems: 'flex-start',
        justifyContent: "space-between",
        // borderWidth: 4,
        // borderColor: 'red',
    },
    buttonPicFeed: {
        marginHorizontal: 5,
        height: 70,
        width: 95
    },
    buttonPicSleep: {
        marginHorizontal: 5,
        height: 80,
        width: 90
    },
    buttonPicTalk: {
        marginHorizontal: 5,
        height: 80,
        width: 80
    }
});