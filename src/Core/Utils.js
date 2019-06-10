export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function intersectTwoRects(rect1, rect2) {
    return !(rect2.left > rect1.right ||
        rect2.right < rect1.left ||
        rect2.top > rect1.bottom ||
        rect2.bottom < rect1.top);
}

export function intersectTwoEntities(lead,follow){
    return follow.y >= lead.y;
}

export function jumpingOverRock(midAir,obstacleName){
    return midAir && obstacleName.includes('rock');
}

export class Rect {
    left = 0;
    top = 0;
    right = 0;
    bottom = 0;

    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}

/*
    Posts player data to api in order to save the users score.
*/
export async function saveScore(form_data){
    const xhr = new XMLHttpRequest();

    let promise = new Promise(function(resolve,reject){
        xhr.onreadystatechange = function(){
            if( xhr.readyState == XMLHttpRequest.DONE ){
                if( xhr.status == 200 ){
                    resolve(JSON.parse(xhr.responseText));
                } else if(xhr.status == 400){
                    alert('An error has occured');
                } else {
                    alert('Unkown error');
                }
            }
        };
    
        xhr.open('POST','https://api.letourneau.io/api/score', true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send( JSON.stringify(form_data) );
    });

    return promise;
}

/*
    Clears then populates the leaderboard. The id from the database is used for players
    to set their initials on to their score.
*/
export async function getLeaderboard(element){
    const xhr = new XMLHttpRequest();

    let promise = new Promise(function(resolve,reject){
        xhr.onreadystatechange = function(){
            if( xhr.readyState == XMLHttpRequest.DONE ){
                if( xhr.status == 200 ){
                    let players = JSON.parse(xhr.responseText);
    
                    //Clear leaderboard
                    if( element ){
                        while(element.firstChild){
                            element.removeChild( element.firstChild );
                        }
                    }
                    
                    if( players.length ){
                        let i = 1;
                        for (const player of players) {
                            let div = document.createElement('div');
                            div.id = player._id;
                            div.setAttribute('db-data', JSON.stringify({ _id: player._id, username: player.name }) );
                            div.className = 'leader-row';
                            div.style.display = 'flex';
        
                            div.innerHTML = `
                                <div>${i++}. ${ player.name }</div>
                                <div>${ player.score }</div>
                            `;
        
                            element.append(div);
                        }
                    } else {
                        element.innerHTML = "<div class='leader-row'>No leaders found</div>";
                    }

                    resolve();
                } else if(xhr.status == 400){
                    alert('An error has occured');
                } else {
                    alert('Unkown error');
                }
            }
        };

        xhr.open('GET','https://api.letourneau.io/api/scores', true);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send();
    });

    return promise;

}