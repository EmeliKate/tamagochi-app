import { StatusBar } from 'expo-status-bar';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./src/app/store";
import NeedBars from "./src/components/NeedBars";
import Controls from "./src/components/Controls";
import Settings from "./src/components/Settings";
import Pic from "./src/components/Pic"
import SettingsButton from "./src/components/SettingsButton";
import Restart from "./src/components/Restart";

export default function App() {

    return (
    <View style={styles.container}>
        <Provider store={store}>
            <Text style={styles.hiText}>Take care after lovely Pusheen!</Text>
            <StatusBar style="auto" />
            <Pic />
            <NeedBars />
            <Controls />
            <SettingsButton />
            <Settings />
            <Restart />
        </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7BAC9',
    },
    hiText: {
        flex: 0.15,
        marginHorizontal: 60,
        marginTop: 100,
        color: "purple",
        fontFamily: "monospace",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
        // borderWidth: 4,
        // borderColor: '#20232a',
    },
    characterMenu: {
        flex: 0.3,
        width: 350,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: -220,
        // borderWidth: 4,
        // borderColor: 'red',
    }
});
