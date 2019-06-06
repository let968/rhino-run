import { Entity } from "./Entity";
import * as Constants from "../Constants";

export class Rhino extends Entity{

    assetName = Constants.RHINO_STRIDE_LEFT;
    speed = Constants.SKIER_STARTING_SPEED;
    speedBoost = 1;

    constructor(x,y){
        super(x,y);

        this.runMotion();
    }

    move(skierDirection){
        switch (skierDirection) {
            case 'skierLeftDown':
                this.moveLeftDown();
                break;
            case 'skierRightDown':
                this.moveRightDown();
                break
            default:
                this.moveDown();
                break;
        }
    }

    moveLeftDown(){
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveRightDown(){
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveDown(){
        this.y += this.speed * this.speedBoost;
    }

    runMotion(){
        this.assetName = this.assetName == Constants.RHINO_STRIDE_LEFT ? Constants.RHINO_STRIDE_RIGHT : Constants.RHINO_STRIDE_LEFT;

        setTimeout(() => {
            this.runMotion();
        }, this.speed * 30);
        
    }
}