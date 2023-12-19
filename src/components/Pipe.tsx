import { Dimensions, Image } from "react-native";
import { TPipe } from "../type";
import {rand} from '../../utils'

const scrW = Dimensions.get("screen").width;
const scrH = Dimensions.get("screen").height;

export const Pipe = ({x, width, hole: {yOffset, height}}: TPipe) => {
    const center = scrH/2 + yOffset;
    const left = x - width/2;

    return (
        <>
        <Image source={require("../../assets/img/pipe.jpeg")} style={{
            position: "absolute",
            resizeMode: "stretch",

            left: left,
            bottom: center + height/2,
            width: width,
            height: scrH - (center + height/2),
        }}/>
        <Image source={require("../../assets/img/pipeCape.jpeg")} style={{
            position: "absolute",
            resizeMode: "stretch",

            left: left-5,
            bottom: center + height/2 - 20,
            width: width+10,
            height: 20,
        }}/>

        <Image source={require("../../assets/img/pipeCape.jpeg")} style={{
            position: "absolute",
            resizeMode: "stretch",

            left: left-5,
            bottom: center - height/2,
            width: width+10,
            height: 20,
        }}/>
        <Image source={require("../../assets/img/pipe.jpeg")} style={{
            position: "absolute",
            resizeMode: "stretch",

            // TODO: hide pipe bottom behind the ground or truncate them
            left: left,
            bottom: 0, // 74
            width: width,
            height: center - height/2, // -74
        }}/>
        </>
    );
};

export const newPipes = (x: number): TPipe => {
    return {
        x: x,
        width: 75,
        hole: {
            yOffset: 0,
            height: 300,
        },
        addToScore: false
    };
};


export const pipePhysic = (pipes: TPipe) => {
    const xinc = -5;
    const spaceRange = {
        min: 200,
        max: 400
    };

    if (pipes.x > - pipes.width/2) {
        pipes.x += xinc;
    }
    else {
        const space = rand(spaceRange.min, spaceRange.max);
        const yBound = (scrH/3) - space;

        pipes.x = scrW;
        pipes.hole = {
            yOffset: rand(-yBound, yBound),
            height: space
        };
        pipes.addToScore = false;
    }
}
