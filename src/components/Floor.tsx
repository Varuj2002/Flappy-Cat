import Matter from 'matter-js';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface FloorProps {
  body: Matter.Body;
  color: string;
}

const Floor: React.FC<FloorProps> = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      style={[
        styles.floor,
        {
          backgroundColor: props.color,
          left: xBody,
          top: yBody,
          width: widthBody,
          height: heightBody,
        },
      ]}
    />
  );
};

// Define styles with StyleSheet for better performance
const styles = StyleSheet.create({
  floor: {
    position: 'absolute',
  },
});

// Define the factory function
interface FloorObject {
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
): FloorObject => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label: 'Floor',
      isStatic: true,
    },
  );
  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    color,
    pos,
    renderer: <Floor body={initialFloor} color={color} />,
  };
};
