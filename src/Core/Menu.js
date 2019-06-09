import { RHINO_END_GAME, SKIER_SPRITE, ASSETS } from '../Constants';
import { saveScore, getLeaderboard } from "./Utils";

export class Menu{
    constructor(){
        this.menuInit();
        this.addOverlay('B');
    }

    menuInit(){
        this.background     = document.createElement("div");
        this.background.id  = 'overlay';

        this.menu        = document.createElement('div');
        this.status      = document.createElement('div');
        this.start       = document.createElement('div');
        this.resume      = document.createElement('div');
        this.restart     = document.createElement('div');
        this.tutorial    = document.createElement('div');
        this.leaderboard = document.createElement('div');
        this.flex        = document.createElement('div');

        this.flex.style.display = 'flex';
        this.flex.style.justifyContent = 'center';
        this.flex.append(this.menu,this.leaderboard);

        this.leaderboard.id = 'leaderboard';
        this.leaderboard.innerHTML = `
            <h1>Leaderboard</h1>
            <div class='_target'></div>
        `;

        this.menu.append(this.start,this.resume,this.restart,this.tutorial);
        this.menu.id = 'menu';
        this.status.id = 'status';

        this.start.innerHTML    = '<div>Start</div><div style="font-size:.30em;color:rgba(255,255,255,.3)">[ Spacebar ]</div>';
        this.resume.innerHTML   = '<div>Resume</div><div style="font-size:.30em;color:rgba(255,255,255,.3)">[ Spacebar ]</div>';
        this.restart.innerHTML  = '<div>Restart</div><div style="font-size:.30em;color:rgba(255,255,255,.3)">[ R ]</div>';
        this.tutorial.innerHTML = '<div>Tutorial</div><div style="font-size:.30em;color:rgba(255,255,255,.3)">[ T ]</div>';

        this.tutorial.onclick = () => {
            this.tutorialPopup();
        }
    }

    gameStatus(state,stats=0){
        while(this.status.firstChild){
            this.status.removeChild(this.status.firstChild);
        }

        const 
            player = document.createElement('div'),
            title = document.createElement('h1'),
            img = document.createElement('img'),
            score = document.createElement('h2'),
            statsContainer = document.createElement('div');

        this.status.prepend(title,img,score,player);

        statsContainer.innerHTML = `
            <table style='margin: 0 auto;color: rgba(255,255,255,.7)'>
                <tr>
                    <th colspan='2'>
                        <h3>Statistics</h3>
                    </th>
                </tr>
                <tr>
                    <td align='right' style='padding-right: 5px;font-weight: bold'>Distance traveled in air:</td>
                    <td>${ stats.distanceInAir }</td>
                </tr>
                <tr>
                    <td align='right' style='padding-right: 5px;font-weight: bold'>Distance traveled left:</td>
                    <td>${ stats.leftTurns }</td>
                </tr>
                <tr>
                    <td align='right' style='padding-right: 5px;font-weight: bold'>Distance traveled right:</td>
                    <td>${ stats.rightTurns }</td>
                </tr>
            </table>
        `;

        getLeaderboard(this.leaderboard.querySelector('._target')).then(()=> {
            switch (state) {
                case 'B':
                    this.start.style.display   = 'block';
                    this.resume.style.display  = 'none';
                    this.restart.style.display = 'none';
                    img.src = ASSETS[SKIER_SPRITE];
                    title.innerHTML = '<div data-text="RHINO RUN" class="game-over"><span>RHINO RUN</span></div>';
                    score.innerText = '';
                    break;
                case 'P':
                    this.start.style.display   = 'none';
                    this.resume.style.display  = 'block';
                    this.restart.style.display = 'block';
                    img.src = ASSETS[SKIER_SPRITE];
                    title.innerText = 'Paused';
                    score.innerText = `Score: ${ stats.score }`;
                    this.status.append(statsContainer);
                    break;
                case 'O':
                    saveScore(stats).then( result => {
                        getLeaderboard(this.leaderboard.querySelector('._target')).then(() => {
                            this.findLeaderboardId(result.insertedId);
                        });
                        
                        this.start.style.display   = 'none';
                        this.resume.style.display  = 'none';
                        this.restart.style.display = 'block';
                        img.src = ASSETS[RHINO_END_GAME[0]];
                        title.innerText = 'Game Over';
                        score.innerText = `Score: ${ stats.score }`;
                        this.status.append(statsContainer);
                        
                        setTimeout(() => {        
                            this.eatSkier(img);
                        }, 2000);
    
                    });
                    break;
                default:
                    break;
            }

        }); 

    }

    addOverlay(state,stats=0){
        this.removeOverlay();
        document.body.append(this.background);

        this.gameStatus(state,stats);
        this.background.append(this.status, this.flex);
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

    tutorialPopup(){
        if( document.body.querySelector("#overlay-2") != null ){
            return;
        }

        const overlay = document.createElement('div');

        document.body.append(overlay);

        overlay.id = 'overlay-2';
        overlay.innerHTML = `
            <div id='container'>
                <table>
                    <tr>
                        <th colspan='2'>Tutorial</th>
                    </tr>
                    <tr>
                        <td>
                            Use the arrow keys to control your character. The up key causes your character to jump.
                        </td>
                        <td>
                            <img src='/img/skier_down.png'>
                            <img src='/img/skier_left_down.png'>
                            <img src='/img/skier_right_down.png'>
                            <img src='/img/skier_jump_3.png'>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Be careful to avoid the trees and rocks while on your way down. (Hint. Rocks can be jumped over)
                        </td>
                        <td>
                            <img src='/img/rock_1.png'>
                            <img src='/img/rock_2.png'>
                            <img src='/img/tree_1.png'>
                            <img src='/img/tree_cluster.png'>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            The Rhino will start chasing you once you reach 5,000 points.
                        </td>
                        <td>
                            <img src='/img/rhino_default.png'>
                        </td>
                    </tr>
                    <tr>
                        <td colspan='2'>
                            <button id='remove-tutorial'>Back</button>
                        </td>
                    </tr>
                </table>
            </div>
        `;

        document.getElementById('remove-tutorial').onclick = () => {
            document.body.removeChild(overlay);
        }
    }

    findLeaderboardId($id){        
        const leaderElement = this.leaderboard.querySelector(`[id='${ $id }']`);
        const firstChild = leaderElement.querySelector('div');

        let leaderData = JSON.parse(leaderElement.getAttribute("db-data"));
        

        firstChild.innerHTML = `
            <div>
                ${ firstChild.innerText.split(' ')[0] }
                <input id='current-score-name' value='${ leaderData.username }'>
                <button id='update-score-button'>Update</button>
            </div>
        `
        
        document.getElementById('update-score-button').onclick = () => {
            const newName = document.getElementById('current-score-name').value;

            if( newName.length > 0 ){
                leaderData.username = newName;
    
                saveScore(leaderData).then(result => {
                    if( result.status ){
                        getLeaderboard(this.leaderboard.querySelector('._target'));
                    }
                });
            } else {
                alert('Name cannot be blank');
            }
            
        }
        
    }
}