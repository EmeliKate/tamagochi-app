import {useRef} from "react"
import {useSelector, useDispatch} from "react-redux";
import {
    changeFeed,
    changeSleep,
    changeSocial,
    setFeed,
    setSleep,
    setSocial,
    toggleSleep
} from "../features/needs/needsSlice";
import {toggleGame, toggleShowModal, toggleRestartVisible} from "../features/settings/settingsSlice";
import {setTimeSaved} from "../features/timer/timerSlice"
import {store} from "../app/store";
import {Button, StyleSheet, Text, View, AppState} from "react-native";
import * as Progress from 'react-native-progress';
import {useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveData, playSound} from "../utils/utils";

const NeedBars = () => {

    const {maxNeedValue} = useSelector((store) => store.needs)
    const {feedNeed} = useSelector((store) => store.needs)
    const {socialNeed} = useSelector((store) => store.needs)
    const {sleepNeed} = useSelector((store) => store.needs)
    const {sleepingIncrement} = useSelector((store) => store.needs)
    const {isSleeping} = useSelector((store) => store.needs)
    const {sleepAddIncrement} = useSelector((store) => store.needs)
    const {feedingIncrement} = useSelector((store) => store.needs)
    const {socialIncrement} = useSelector((store) => store.needs)
    const {gameOn} = useSelector((store) => store.settings)
    const {timeSaved} = useSelector((store) => store.timer)
    const {onActiveOnlyModeOn} = useSelector((store) => store.settings)
    const {gameSpeedCoefficient} = useSelector((store) => store.settings)
    const dispatch = useDispatch()

    const daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    }
    const currentTime = () => {
        return new Date().getSeconds() + new Date().getMinutes()*60 + new Date().getHours()*60*60 + new Date().getDate()*60*60*24 +
        (new Date().getMonth()+1)*daysInMonth(new Date().getMonth()+1, new Date().getFullYear())*24*60*60
    }
    let timeDifference = 0;

    useEffect(() => {
        if (gameOn){
            saveData("sleepNeed", sleepNeed)
            saveData("feedNeed", feedNeed)
            saveData("socialNeed", socialNeed)
            saveData("timeSaved", timeSaved)
            saveData("isSleeping", isSleeping)
        }
    }, [sleepNeed, feedNeed, socialNeed, timeSaved, isSleeping])

    const setValueWithinRange = (currentValue, minValue, maxValue) => {
        if (currentValue > maxValue){
            return maxValue
        }
        if(currentValue < minValue){
            return minValue
        }
        return currentValue
    }

    const resetNeeds = () => {
        dispatch(setFeed(maxNeedValue))
        dispatch(setSocial(maxNeedValue))
        dispatch(setSleep(maxNeedValue))
    }

    //resetNeeds()

    const initValues = async () => {
        const sleepData = await AsyncStorage.getItem("sleepNeed") ? await AsyncStorage.getItem("sleepNeed") : sleepNeed
        const feedData = await AsyncStorage.getItem("feedNeed") ? await AsyncStorage.getItem("feedNeed") : feedNeed
        const socialData = await AsyncStorage.getItem("socialNeed") ? await AsyncStorage.getItem("socialNeed") : socialNeed
        const timeSavedData = await AsyncStorage.getItem("timeSaved") ? await AsyncStorage.getItem("timeSaved") : timeSaved
        console.log("timeSavedData: " + parseInt(timeSavedData))
        console.log("current time: " + currentTime())
        timeDifference = currentTime() - timeSavedData;
        console.log("time saved difference: " + timeDifference)
        const isSleepingData = await AsyncStorage.getItem("isSleeping") ? await AsyncStorage.getItem("isSleeping") : isSleeping
        const onActiveModeOnData = await AsyncStorage.getItem("onActiveOnlyModeOn") ? await AsyncStorage.getItem("onActiveOnlyModeOn")==="true" : onActiveOnlyModeOn

        //onActiveOnlyModeOn - needs to be saved in storage too, but in the settings component

        if(!onActiveModeOnData){
            dispatch(setFeed(setValueWithinRange(parseInt(feedData) - (gameSpeedCoefficient*parseInt(timeDifference)/60)*feedingIncrement, 0, maxNeedValue)))
            dispatch(setSocial(setValueWithinRange(parseInt(socialData) - (gameSpeedCoefficient*parseInt(timeDifference)/60)*socialIncrement, 0, maxNeedValue)))
            console.log("isSleepingData: " + isSleepingData)
            if(isSleepingData === "false"){
                dispatch(setSleep(setValueWithinRange(parseInt(sleepData) - (gameSpeedCoefficient*parseInt(timeDifference)/60)*sleepingIncrement, 0, maxNeedValue)))
            } else {
                dispatch(setSleep(setValueWithinRange(parseInt(sleepData) + (gameSpeedCoefficient*parseInt(timeDifference)/60)*sleepAddIncrement, 0, maxNeedValue)))
            }
        } else {
             dispatch(setSleep(parseInt(sleepData)))
             dispatch(setFeed(parseInt(feedData)))
             dispatch(setSocial(parseInt(socialData)))
        }
        dispatch(toggleGame())
    }

    const appState = useRef(AppState.currentState);
    useEffect(() => {
        console.log("init")
        initValues()

        const subscription = AppState.addEventListener("change", nextAppState  => {
            if (appState.current.match(/inactive|background/) && nextAppState==="active"){
                dispatch(toggleGame())
                initValues()
            }
            appState.current = nextAppState;
        });
        return () => {
            subscription.remove();
        }
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (gameOn){
                console.log("currentTime: " + currentTime())
                dispatch(setTimeSaved(currentTime()))
                console.log("game on: " + gameOn)
                if (!isSleeping) {
                    dispatch(changeSleep(-sleepingIncrement))
                } else {
                    console.log("sleeping")
                    dispatch(changeSleep(sleepAddIncrement))
                    if (sleepNeed>maxNeedValue){
                        dispatch(toggleSleep())
                        dispatch(setSleep(maxNeedValue))
                        playSound("sound")
                    }
                }
                dispatch(changeSocial(-socialIncrement))
                dispatch(changeFeed(-feedingIncrement))
                if (sleepNeed<0.1 || feedNeed<0.1 || socialNeed<0.1){
                    dispatch(toggleRestartVisible())
                    dispatch(toggleGame())
                    playSound("sound")
                }
            }
            else {
                console.log("game over")
            }
        }, 1000*60/gameSpeedCoefficient);
        return () => {
            clearInterval(interval)
        }
    }, [feedNeed, sleepNeed, socialNeed, gameOn, sleepingIncrement, feedingIncrement, socialIncrement, maxNeedValue, timeSaved])

    return (
        <View style={styles.progressBars}>
            <View style={styles.bar}>
                <Text style={styles.barLabel}>Food</Text>
                <Progress.Bar
                    progress={feedNeed/maxNeedValue}
                    width={245}
                    height={15}
                    borderColor={"rgb(77, 43, 25)"}
                    color={"rgb(164, 149, 141)"}
                    borderWidth={4}
                    borderRadius={10}/>
            </View>
            <View style={styles.bar}>
                <Text style={styles.barLabel}>Energy</Text>
                <Progress.Bar
                    progress={sleepNeed/maxNeedValue}
                    width={230}
                    height={15}
                    borderColor={"rgb(77, 43, 25)"}
                    color={"rgb(164, 149, 141)"}
                    borderWidth={4}
                    borderRadius={10}/>
            </View>
            <View style={styles.bar}>
                <Text style={styles.barLabel}>Love</Text>
                <Progress.Bar
                    progress={socialNeed/maxNeedValue}
                    width={245}
                    height={15}
                    borderColor={"rgb(77, 43, 25)"}
                    color={"rgb(164, 149, 141)"}
                    borderWidth={4}
                    borderRadius={10}/>
            </View>
        </View>
    );
}

export default NeedBars;

const styles = StyleSheet.create({
    progressBars: {
        height: 100,
        justifyContent: "center",
        marginHorizontal: 60,
        // borderWidth: 4,
        // borderColor: '#20232a',
    },
    bar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5
    },
    barLabel: {
        color: "purple",
        fontFamily: "monospace",
    }
});