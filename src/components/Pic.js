import {useSelector} from "react-redux";
import {store} from "../app/store";
import {Image, StyleSheet, View} from "react-native";
import {useEffect, useLayoutEffect, useState} from "react";

const Pic = () => {

    const defaultImage = "../assets/pics/calm.png"
    const happyImage = "../assets/pics/happy.png"
    const unhappyImage = "../assets/pics/unhappy.png"
    const sleepingImage = "../assets/pics/sleeping.png"
    const cryingImage = "../assets/pics/crying.png"

    const {gameOn} = useSelector((store) => store.settings)
    const {maxNeedValue} = useSelector((store) => store.needs)
    const {feedNeed} = useSelector((store) => store.needs)
    const {socialNeed} = useSelector((store) => store.needs)
    const {sleepNeed} = useSelector((store) => store.needs)
    const {isSleeping} = useSelector((store) => store.needs)

    const highNeedCoefficient = 0.9
    const midNeedCoefficient = 0.5
    const lowNeedCoefficient = 0.15

    const [picPath, setPicPath] = useState(defaultImage)

    const setPic = () => {
        if (!gameOn){
            setPicPath(cryingImage)
        } else {
            if (isSleeping){
                setPicPath(sleepingImage)
            } else {
                if (feedNeed/maxNeedValue>highNeedCoefficient && socialNeed/maxNeedValue>highNeedCoefficient && sleepNeed/maxNeedValue>highNeedCoefficient){
                    setPicPath(happyImage)
                } else if (feedNeed/maxNeedValue>midNeedCoefficient && socialNeed/maxNeedValue>midNeedCoefficient && sleepNeed/maxNeedValue>midNeedCoefficient){
                    setPicPath(defaultImage)
                } else if (feedNeed/maxNeedValue>lowNeedCoefficient && socialNeed/maxNeedValue>lowNeedCoefficient && sleepNeed/maxNeedValue>lowNeedCoefficient) {
                    setPicPath(unhappyImage)
                }
            }
        }
    }

    useEffect(() => {
        setPic()
    }, [feedNeed, sleepNeed, socialNeed, gameOn])


    return(
        <View>
            {picPath === defaultImage && (<Image style={styles.pic}
                source={require(defaultImage)}
            />)}
            {picPath === cryingImage && (<Image style={styles.pic}
                source={require(cryingImage)}
            />)}
            {picPath === unhappyImage && (<Image style={styles.pic}
                source={require(unhappyImage)}
            />)}
            {picPath === sleepingImage && (<Image style={styles.pic}
                source={require(sleepingImage)}
            />)}
            {picPath === happyImage && (<Image style={styles.pic}
                source={require(happyImage)}
            />)}
        </View>
    )
}

export default Pic;

const styles = StyleSheet.create({
    pic: {
        width: 250,
        height: 250,
        marginHorizontal: 60,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        // borderWidth: 4,
        // borderColor: '#20232a',
    }
})