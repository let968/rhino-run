/*

    NF9 - Increased difficulty the further a player goes

*/




import * as Constants from '../../Constants';
import { randomInt } from '../../Core/Utils';
import { Obstacle } from "./Obstacle";

const DISTANCE_BETWEEN_OBSTACLES = 50;
const STARTING_OBSTACLE_GAP = 100;
const STARTING_OBSTACLE_REDUCER = 300;

/*
    -- NF9 --
    Changed from const to allow difficutly change.
    Minimum value of NEW_OBSTACLE_CHANCE is 3. Anything lower is nearly impossible to navigate the skier.
*/
export let NEW_OBSTACLE_CHANCE = 8;
export let DIFFICULTY = 0;

export class ObstacleManager {
    obstacles = [];

    constructor() {
    }

    getObstacles() {
        return this.obstacles;
    }

    drawObstacles(canvas, assetManager) {
        this.obstacles.forEach((obstacle) => {
            obstacle.draw(canvas, assetManager);
        });
    }

    placeInitialObstacles() {
        const numberObstacles = Math.ceil((Constants.GAME_WIDTH / STARTING_OBSTACLE_REDUCER) * (Constants.GAME_HEIGHT / STARTING_OBSTACLE_REDUCER));

        NEW_OBSTACLE_CHANCE = 8;
        DIFFICULTY = 0;

        const minX = -Constants.GAME_WIDTH / 2;
        const maxX = Constants.GAME_WIDTH / 2;
        const minY = STARTING_OBSTACLE_GAP;
        const maxY = Constants.GAME_HEIGHT / 2;

        for(let i = 0; i < numberObstacles; i++) {
            this.placeRandomObstacle(minX, maxX, minY, maxY);
        }

        this.obstacles.sort((obstacle1, obstacle2) => {
            return obstacle1.getPosition().y - obstacle2.getPosition().y;
        });
    }

    placeNewObstacle(gameWindow, previousGameWindow) {
        const shouldPlaceObstacle = randomInt(1, NEW_OBSTACLE_CHANCE);

        //Or statement fixes null object that would happen rarely on initial game load
        if(shouldPlaceObstacle !== NEW_OBSTACLE_CHANCE || previousGameWindow == null) {
            return;
        }

        if(gameWindow.left < previousGameWindow.left) {
            this.placeObstacleLeft(gameWindow);
        }
        else if(gameWindow.left > previousGameWindow.left) {
            this.placeObstacleRight(gameWindow);
        }

        if(gameWindow.top < previousGameWindow.top) {
            this.placeObstacleTop(gameWindow);
        }
        else if(gameWindow.top > previousGameWindow.top) {
            this.placeObstacleBottom(gameWindow);
        }
    };

    placeObstacleLeft(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.left, gameWindow.top, gameWindow.bottom);
    }

    placeObstacleRight(gameWindow) {
        this.placeRandomObstacle(gameWindow.right, gameWindow.right, gameWindow.top, gameWindow.bottom);
    }

    placeObstacleTop(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.top, gameWindow.top);
    }

    placeObstacleBottom(gameWindow) {
        this.placeRandomObstacle(gameWindow.left, gameWindow.right, gameWindow.bottom, gameWindow.bottom);
    }

    placeRandomObstacle(minX, maxX, minY, maxY) {
        const position = this.calculateOpenPosition(minX, maxX, minY, maxY);
        const newObstacle = new Obstacle(position.x, position.y);

        this.obstacles.push(newObstacle);
    }

    calculateOpenPosition(minX, maxX, minY, maxY) {
        const x = randomInt(minX, maxX);
        const y = randomInt(minY, maxY);

        const foundCollision = this.obstacles.find((obstacle) => {
            return (
                x > (obstacle.x - DISTANCE_BETWEEN_OBSTACLES) &&
                x < (obstacle.x + DISTANCE_BETWEEN_OBSTACLES) &&
                y > (obstacle.y - DISTANCE_BETWEEN_OBSTACLES) &&
                y < (obstacle.y + DISTANCE_BETWEEN_OBSTACLES)
            );
        });

        if(foundCollision) {
            return this.calculateOpenPosition(minX, maxX, minY, maxY);
        }
        else {
            return {
                x: x,
                y: y
            };
        }
    }

    /*
        -- NF9 --
        Scaling increases every 10,000 pixels travelled.
        Set as is to prevent coding with a switch statement or a lot of if else statements
    */
    scaleDifficulty(score){
        let newDifficulty = Math.floor(score / 10000);

        if( NEW_OBSTACLE_CHANCE > 3 && DIFFICULTY != newDifficulty && NEW_OBSTACLE_CHANCE - 1 >= 3 ){
            DIFFICULTY++;
            NEW_OBSTACLE_CHANCE--;
        }
    }
}