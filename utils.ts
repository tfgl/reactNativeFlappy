import AsyncStorage from '@react-native-community/async-storage';

export const rand = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min) ) + min;
};

export const delay = (delay: number) => {
    return new Promise( res => setTimeout(res, delay) );
};

// Retrieve the score
export const getHighScore = async () => {
    try {
        const highScore = await AsyncStorage.getItem('highScore');

        if(!highScore)
            return 0;

        return +highScore;
    } catch (error) {
        console.error('Error retrieving score:', error);
    }
};

// Save the score
export const saveHighScore = async (score: number) => {
    try {
        await AsyncStorage.setItem('highScore', score.toString());
    } catch (error) {
        console.error('Error saving score:', error);
    }
};
