import { Dimensions, StyleSheet, View, TouchableWithoutFeedback, Image } from "react-native";
import { Bird, newBird, birdPhysic } from "./src/components/Bird";
import { Pipe, newPipes, pipePhysic } from "./src/components/Pipe";
import { Score } from "./src/components/Score";
import { GameOver } from "./src/components/GameOver";
import { useEffect, useState } from "react";
import { delay, saveHighScore, getHighScore } from './utils'
import { TBird, TGame, TPipe } from "./src/type";

const scrW = Dimensions.get("screen").width;
const scrH = Dimensions.get("screen").height;

const collide = (bird: TBird, pipes: TPipe) => {
    const holeY = pipes.hole.yOffset + scrH / 2;

    const overlapOnX = ((bird.x + bird.width) > pipes.x) && (bird.x < (pipes.x + pipes.width))
    const outsideGape = (bird.y < (holeY - pipes.hole.height/2)) || ((bird.y + bird.height) > (holeY + pipes.hole.height/2));
    const touchGround = bird.y <= 0;

    let contact = touchGround || (overlapOnX && outsideGape);

    return contact;
};

const checkCollisions = (game: TGame) => {
    game.shouldRun = !collide(game.bird, game.pipePairs[0]);
    if(!game.shouldRun) {
        getHighScore().then( prevHighScore => {
            if(prevHighScore && (prevHighScore < game.score))
                saveHighScore(game.score);
        });
    }
};

const updateScore = (game: TGame) => {
    if(!game.shouldRun) return;

    game.pipePairs.forEach((pipe) => {
        if(!pipe.addToScore && (pipe.x < game.bird.x)) {
            game.score += 1;
            pipe.addToScore = true;
        }
    });
};

const newGame = (): TGame => {
    return {
        bird: newBird(scrW/3, scrH/2, 50, 50),
        pipePairs: [newPipes(scrW), newPipes(scrW + scrW/2)],
        shouldRun: true,
        score: 0,
        timeScale: 16
    };
}

export default function App() {
    const [gameState, setGame] = useState(newGame());
    const [birdYVelocity, setBirdYVelocity] = useState(-10);

    //saveScore(10);
    //getScore();
    
    useEffect( () => {
        let t1 = performance.now();
        let nextGameState = {...gameState};

        birdPhysic(nextGameState.bird, birdYVelocity, setBirdYVelocity);
        nextGameState.pipePairs.forEach((pipe) => pipePhysic(pipe));
        checkCollisions(nextGameState);
        updateScore(nextGameState);
        let t2 = performance.now();

        let dt = t2 - t1;
        delay(gameState.timeScale - dt).then( () => {
            t1 = performance.now();
            if(gameState.shouldRun) {
                setGame(nextGameState);
            }
        });
    }, [gameState]);

    return (
        <TouchableWithoutFeedback onPress={() => {setBirdYVelocity(10)}}>
            <View style={styles.container}>
                <Image source={require("./assets/img/background.png")} style={styles.background}/>
                <Bird x={gameState.bird.x}  y={gameState.bird.y} width={gameState.bird.width} height={gameState.bird.height}/>
                <Pipe x={gameState.pipePairs[0].x} width={gameState.pipePairs[0].width} hole={gameState.pipePairs[0].hole} addToScore={gameState.pipePairs[0].addToScore}/>
                <Pipe x={gameState.pipePairs[1].x} width={gameState.pipePairs[1].width} hole={gameState.pipePairs[1].hole} addToScore={gameState.pipePairs[0].addToScore}/>
                {gameState.shouldRun? <Score score={gameState.score}/> : <GameOver score={gameState.score}/>}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        resizeMode: "stretch",
        left:   0,
        bottom: 0,
        width:  scrW,
        height: scrH,
    },
    score: {
        color: "#fff",
        fontSize: 40
    }
});
