import Matter from 'matter-js';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface ObstacleProps {
  body: Matter.Body;
  color: string;
}

const Obstacle: React.FC<ObstacleProps> = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = widthBody * 2;

  const color = props.color;

  return (
    <View
      style={[
        styles.obstacle,
        {
          borderColor: color,
          top: yBody,
          left: xBody,
          width: 50,
          height: 50
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  obstacle: {
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    backgroundColor: 'yellow',
  },
});

interface ObstacleObject {
  body: Matter.Body;
  color: string;
  pos: Matter.Vector;
  renderer: React.ReactElement;
}

export default (
  world: Matter.World,
  label: string,
  color: string,
  pos: Matter.Vector,
  size: {width: number; height: number},
): ObstacleObject => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label,
      isStatic: true,
    },
  );
  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle body={initialObstacle} color={color} />,
  };
};
