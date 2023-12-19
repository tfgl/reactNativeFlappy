export type TBird = {
    x: number,
    y: number,
    width: number,
    height: number,
};

export type TPipe = {
    x: number,
    width: number,
    hole: {
        yOffset: number,
        height: number
    },
    addToScore: boolean
};

export type TGame = {
    bird: TBird,
    pipePairs: TPipe[],
    shouldRun: boolean,
    score: number,
    timeScale: number
};

