import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

interface Position {
  x: number;
  y: number;
}

interface Size {
  height: number;
  width: number;
}

interface Pipe {
  pos: Position;
  size: Size;
}

export const getPipeSizePosPair = (
  addToPosX: number = 0,
): { pipeTop: Pipe; pipeBottom: Pipe } => {
  let yPosTop = -getRandom(300, windowHeight - 100);

  const pipeTop: Pipe = {
    pos: { x: windowWidth + addToPosX, y: yPosTop },
    size: { height: windowHeight * 2, width: 75 },
  };
  const pipeBottom: Pipe = {
    pos: { x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop },
    size: { height: windowHeight * 2, width: 75 },
  };

  return { pipeTop, pipeBottom };
};
