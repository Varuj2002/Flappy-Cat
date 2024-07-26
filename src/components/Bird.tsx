import Matter from 'matter-js';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import CatSprite from './CatSprite';

interface BirdProps {
  body: Matter.Body;
  color: string;
}

const Bird: React.FC<BirdProps> = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      style={[
        styles.container,
        {
          left: xBody,
          top: yBody,
        },
      ]}>
      <CatSprite />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

interface BirdObject {
  body: Matter.Body;
  color: string;
  pos: Matter.Vector;
  renderer: React.ReactElement;
}

export default (
  world: Matter.World,
  color: string,
  pos: Matter.Vector,
  size: {width: number; height: number},
): BirdObject => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Bird'},
  );
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird body={initialBird} color={color} />,
  };
};
