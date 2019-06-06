import { RHINO_END_GAME, SKIER_SPRITE, ASSETS } from '../Constants';

export class Menu{
    action = null;
    score = 0;

    constructor(){
        this.menuInit();
        this.addOverlay('B');
    }

    menuInit(){
        this.background     = document.createElement("div");
        this.background.id  = 'overlay';

        this.menu       = document.createElement('div');
        this.status     = document.createElement('div');
        this.start      = document.createElement('div');
        this.resume     = document.createElement('div');
        this.restart    = document.createElement('div');

        this.menu.append(this.start,this.resume,this.restart);
        this.menu.id = 'menu';
        this.status.id = 'status';

        this.start.innerHTML    = '<div>Start</div><div style="font-size:.30em;color:rgba(255,255,255,.3)">[ Spacebar ]</div>';
        this.resume.innerHTML   = '<div>Resume</div><div style="font-size:.30em;color:rgba(255,255,255,.3)">[ Spacebar ]</div>';
        this.restart.innerHTML  = '<div>Restart</div><div style="font-size:.30em;color:rgba(255,255,255,.3)">[ R ]</div>';
    }

    gameStatus(state){
        while(this.status.firstChild){
            this.status.removeChild(this.status.firstChild);
        }

        const 
            title = document.createElement('h1'),
            img = document.createElement('img'),
            score = document.createElement('h2');


        switch (state) {
            case 'B':
                this.start.style.display   = 'block';
                this.resume.style.display  = 'none';
                this.restart.style.display = 'none';
                img.src = ASSETS[SKIER_SPRITE];
                title.innerHTML = '<span style="font-size: 1.5em;text-decoration: underline">RHINO RUN</span>';
                score.innerText = '';
                break;
            case 'P':
                this.start.style.display   = 'none';
                this.resume.style.display  = 'block';
                this.restart.style.display = 'block';
                img.src = ASSETS[SKIER_SPRITE];
                title.innerText = 'Paused';
                score.innerText = `Score: ${ this.score }`;
                break;
            case 'O':
                this.start.style.display   = 'none';
                this.resume.style.display  = 'none';
                this.restart.style.display = 'block';
                img.src = ASSETS[RHINO_END_GAME[0]];
                title.innerText = 'Game Over';
                score.innerText = `Score: ${ this.score }`;
    
                setTimeout(() => {        
                    this.eatSkier(img);
                }, 2000);
                break;
            default:
                break;
        }

        this.status.append(title,img,score);
    }

    addOverlay(state){
        this.removeOverlay();
        document.body.append(this.background);

        this.gameStatus(state);
        this.background.append(this.status, this.menu);
    }

    removeOverlay(){
        if( document.body.querySelector("#overlay") != null ){
            while(this.background.firstChild){
                this.background.removeChild(this.background.firstChild);
            }

            document.body.removeChild(this.background);
        }
    }

    eatSkier(img){
        setTimeout(() => {                  
            img.src = ASSETS[RHINO_END_GAME[0]];
            setTimeout(() => {                  
                img.src = ASSETS[RHINO_END_GAME[1]];
                setTimeout(() => {                  
                    img.src = ASSETS[RHINO_END_GAME[2]];
                    setTimeout(() => {                  
                        img.src = ASSETS[RHINO_END_GAME[3]];
                        setTimeout(() => {                  
                            img.src = ASSETS[RHINO_END_GAME[4]];
                            setTimeout(() => {                  
                                img.src = ASSETS[RHINO_END_GAME[5]];
                            }, 300);
                        }, 300);
                    }, 300);
                }, 300);
            }, 300);
        }, 300);
    }
}