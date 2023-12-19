import { Image } from "react-native";
import { TBird } from "../type";

export const Bird = ({x, y, width, height}: TBird) => {
    return (
        <Image source={require("../../assets/img/bird.png")} style={{
            position: 'absolute',
            left:   x - width/2,
            bottom: y - height/2,
            width: width,
            height: height,
        }}/>
    );
}

export const birdPhysic = (bird: TBird, yVelocity: number, setYVelocity: any) => {
    const g = -0.25;
    const maxG = -10;

    if (bird.y > 0) {
        bird.y += yVelocity;

        if(yVelocity > maxG)
            setYVelocity(yVelocity + g);
    }
};

export const newBird = (x: number, y: number, w: number, h: number): TBird => {
    return {
        x: x,
        y: y,
        width: w,
        height: h
    };
};
