import Matter from 'matter-js';
import { Dimensions } from 'react-native';
import { getPipeSizePosPair } from './src/utils/index';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

interface Entity {
    body: Matter.Body;
    point?: boolean;
    renderer: React.ReactElement;
}

interface Entities {
    [key: string]: Entity | { body: Matter.Body };
    physics: {
        engine: Matter.Engine;
        world: Matter.World;
    };
    Bird: Entity;
    [key: `ObstacleTop${number}`]: Entity;
    [key: `ObstacleBottom${number}`]: Entity;
}

interface PhysicsProps {
    entities: Entities;
    touches: Array<{ type: string }>;
    time: { delta: number };
    dispatch: (action: { type: string }) => void;
}

const Physics = ({
    entities,
    touches,
    time,
    dispatch,
}: PhysicsProps): Entities => {
    let engine = entities.physics.engine;

    touches
        .filter(t => t.type === 'press')
        .forEach(() => {
            Matter.Body.setVelocity(entities.Bird.body, {
                x: 0,
                y: -5,
            });
        });

    Matter.Engine.update(engine, time.delta);

    for (let index = 1; index <= 2; index++) {
        const obstacleTop = entities[`ObstacleTop${index}`] as Entity;

        if (obstacleTop.body.bounds.max.x <= 50 && !obstacleTop.point) {
            // obstacleTop.point = true;
            // dispatch({ type: "new_point" });
        }

        // if (obstacleTop.body.bounds.max.x <= 0) {
        //     const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
        //     Matter.Body.setPosition(
        //         obstacleTop.body,
        //         pipeSizePos.pipeTop.pos
        //     );
        //     Matter.Body.setPosition(
        //         entities[`ObstacleBottom${index}`].body,
        //         pipeSizePos.pipeBottom.pos
        //     );
        //     obstacleTop.point = false;
        // }

        Matter.Body.translate(obstacleTop.body, {
            x: -3,
            y: 0,
        });
        // Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
        //     x: -3,
        //     y: 0
        // });
    }

    Matter.Events.on(engine, 'collisionStart', () => {
        dispatch({ type: 'game_over' });
    });

    return entities;
};

export default Physics;
