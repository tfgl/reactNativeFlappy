import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { getHighScore } from '../../utils'
import { useState } from "react";
import { NativeModules } from "react-native";


const scrW = Dimensions.get("screen").width;
const scrH = Dimensions.get("screen").height;

type GameOverProps = {
    score: number,
};

export const GameOver = (props: GameOverProps) => {
    const [highScore, setHighScore] = useState(0);

    getHighScore().then((hs) => {
        if(hs)
            setHighScore(hs);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.score}> best: {highScore} </Text>
            <Text style={styles.score}> score: {props.score} </Text>
            <Button title="retry" onPress={() => { NativeModules.DevSettings.reload(); }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: "#000",
        position: 'absolute',
        resizeMode: "stretch",
        left:   scrW/4,
        bottom: scrH/4,
        width:  scrW/2,
        height: scrH/2,
    },
    score: {
        color: "#fff",
        fontSize: 40
    }
});
