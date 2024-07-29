import Matter from 'matter-js';
import Floor from '../components/Floor';
import Obstacle from '../components/Obstacle';
import Cat from '../components/Cat';
import { getPipeSizePosPair } from '../utils/index';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface GameEntities {
    physics: {
        engine: Matter.Engine;
        world: Matter.World;
    };
    Cat: ReturnType<typeof Cat>;
    ObstacleTop1: ReturnType<typeof Obstacle>;
    ObstacleTop2: ReturnType<typeof Obstacle>;
    Floor: ReturnType<typeof Floor>;
}

export default (): GameEntities => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;


    let worldObstacle = engine.world;


    worldObstacle.gravity.y = 0.1;
    world.gravity.y = 0.4;
    world.gravity.x = 0.01;
    worldObstacle.gravity.x = 0.01;


    const pipeSizePosA = getPipeSizePosPair();
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

    return {
        physics: { engine, world },

        Cat: Cat(world, 'green', { x: 50, y: 300 }, { height: 40, width: 40 }),

        ObstacleTop1: Obstacle(
            worldObstacle,
            'ObstacleTop1',
            'red',
            pipeSizePosA.pipeTop.pos,
            pipeSizePosA.pipeTop.size,
        ),
        // Uncomment if needed
        // ObstacleBottom1: Obstacle(
        //     world,
        //     "ObstacleBottom1",
        //     "blue",
        //     pipeSizePosA.pipeBottom.pos,
        //     pipeSizePosA.pipeBottom.size
        // ),

        ObstacleTop2: Obstacle(
            worldObstacle,
            'ObstacleTop2',
            'red',
            pipeSizePosB.pipeTop.pos,
            pipeSizePosB.pipeTop.size,
        ),
        // Uncomment if needed
        // ObstacleBottom2: Obstacle(
        //     world,
        //     "ObstacleBottom2",
        //     "blue",
        //     pipeSizePosB.pipeBottom.pos,
        //     pipeSizePosB.pipeBottom.size
        // ),

        Floor: Floor(
            world,
            'green',
            { x: windowWidth / 2, y: windowHeight },
            { height: 50, width: windowWidth },
        ),
    };
};
