import { Dimensions, StyleSheet, Text} from "react-native";

const scrH = Dimensions.get("screen").height;

type ScoreProps = {
    score: number,
};

export const Score = (props: ScoreProps) => {
    return (
        <>
            <Text style={styles.score}> score: {props.score} </Text>
        </>
    );
};

const styles = StyleSheet.create({
    score: {
        color: "#fff",
        fontSize: 40,
        marginBottom: 500
    }
});
