import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { Rhino } from "../Entities/Rhino";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect, intersectTwoEntities } from './Utils';
import { Menu } from './Menu';

export class Game{
    gameWindow = null;

    constructor() {
        this.menu = new Menu();
        this.assetManager = new AssetManager();
        this.scoreDisplay = document.createElement('div');
        this.scoreDisplay.id = 'score';
        this.scoreDisplay.innerHTML = 0;
        
        document.body.appendChild(this.scoreDisplay);
        document.addEventListener('keydown', this.handleKeyDown.bind(this));

        this.state = 'B';
        
        this.menu.start.onclick = () => {
            this.startGame();
        }
        this.menu.resume.onclick = () => {
            this.resumeGame()
        }
        this.menu.restart.onclick = () => {
            this.startGame();
        }
    }

    init() {
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.rhino = null;
        this.obstacleManager = new ObstacleManager();
        this.obstacleManager.placeInitialObstacles();
    }

    startGame(){
        if( document.body.querySelector("#skiCanvas") != null ){
            document.body.removeChild(document.getElementById("skiCanvas"));
        }

        this.menu.removeOverlay();
        this.init();

        //Used to load obstacles in before game starts
        this.run();
        this.updateScore(0);

        setTimeout(() => {
            this.state = 'I';
            this.run();
        }, 2000);
        

    }

    pauseGame(){
        this.state = 'P';
        this.menu.addOverlay(this.state);
    }

    resumeGame(){
        this.state = 'I';
        this.menu.removeOverlay();
        this.run();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        if( this.state == 'I' ){
            requestAnimationFrame(this.run.bind(this));
        }

        this.canvas.clearCanvas();    
        this.updateGameWindow();
        this.drawGameWindow();
    }

    updateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const skierAsset = this.skier.getAssetName();
        this.skier.move();
        this.updateScore(skierPosition.y);
        
        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();
        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);
        this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        
        if( !this.rhino && this.menu.score > 7500 ){
            this.rhino = new Rhino(skierPosition.x, skierPosition.y - 500);
            this.rhino.speedBoost = 1.25;
        } else if( this.rhino ){
            if( this.rhino.speed > 1 && skierPosition.y - this.rhino.getPosition().y < 150 ){
                this.rhino.speedBoost = 1;
            }
            this.rhino.move(skierAsset);
        }

        
        //if rhino reached player end the game
        if( this.rhino && intersectTwoEntities(this.skier.getPosition(),this.rhino.getPosition()) ) {
            this.state = 'O';
            this.menu.addOverlay(this.state);
        }

    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.skier.draw(this.canvas, this.assetManager);
        
        if( this.rhino ){
            this.rhino.draw(this.canvas, this.assetManager);
        }

        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        console.log(event.which);
        
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.startJump();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.R:
                if( this.state == 'P' || this.state == 'O' ){
                    this.startGame();
                }
                break;
            case Constants.KEYS.T:
                if( this.state != 'I' ){
                    this.menu.tutorialPopup();
                }
                break;
            case Constants.KEYS.SPACE:
                switch (this.state) {
                    case 'I':
                        this.pauseGame();
                        break;
                    case 'P':
                        this.resumeGame();
                        break;
                    case 'B':
                        this.startGame();
                        break;
                    default:
                        break;
                }
                break;
        }
    }

    updateScore(distance){
        this.menu.score = Math.round(distance);
        this.scoreDisplay.innerText = this.menu.score;
    }
    
}