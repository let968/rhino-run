import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect, jumpingOverRock } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    inAir = 0;
    stats = {
        username: 'AAA',
        score: 0,
        leftTurns: 0,
        rightTurns: 0,
        jumps: 0,
    };

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {        
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.JUMP:
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.stats.leftTurns++;
        this.stats.score += Math.round(this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER);
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.stats.score += this.speed;
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.stats.rightTurns++;
        this.stats.score += Math.round(this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER);
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    startJump() {
        //if already in the air or not going straight down hill do not run jump code again
        if( this.direction != Constants.SKIER_DIRECTIONS.DOWN || this.inAir ){
            return;
        }

        this.stats.jumps++;
        this.inAir = 1;
        this.direction = Constants.SKIER_DIRECTIONS.JUMP;
        this.updateAsset();
        this.y += Constants.SKIER_STARTING_SPEED;

        setTimeout(() => {
            this.endJump();
        }, 500);
    }

    endJump(){
        if( this.inAir ){
            this.inAir = 0;
            this.direction = Constants.SKIER_DIRECTIONS.DOWN;
            this.updateAsset();
        }
    }

    turnLeft() {
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        }

        // Fixed bug that crashed game on moving left afer hitting an obstacle
        else if(this.direction === Constants.SKIER_DIRECTIONS.CRASH){
            this.setDirection(1);
            this.moveSkierLeft();
        } 
        else {
            //Prevents turning while jumping resulting in a game crash
            if( this.direction >= 1 ){
                this.setDirection(this.direction - 1);
            }
        }
    }

    turnRight() {
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        }
        // Fixed bug where you cannot move right after collision
        else if(this.direction === Constants.SKIER_DIRECTIONS.CRASH){
            this.setDirection(5);
            this.moveSkierRight();
        } 
        else {
            //Prevents turning while jumping resulting in a skiier crash
            if( this.direction >= 1 ){
                this.setDirection(this.direction + 1);
            }       
        }
    }

    turnDown() {
        if( this.direction !== Constants.SKIER_DIRECTIONS.JUMP){
            this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        
        const asset = assetManager.getAsset(this.assetName);
        
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleName = obstacle.getAssetName();
            const obstacleAsset = assetManager.getAsset(obstacleName);
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            const intersection = intersectTwoRects(skierBounds, obstacleBounds);

            return intersection && !jumpingOverRock(this.inAir,obstacleName);
        });

        if(collision) {
            this.inAir = 0;
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
        }
    };
}