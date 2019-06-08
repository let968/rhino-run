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

export function saveScore(form_data){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if( xhr.readyState == XMLHttpRequest.DONE ){
            if( xhr.status == 200 ){
                console.log(xhr.responseText);
            } else if(xhr.status == 400){
                alert('An error has occured');
            } else {
                alert('Unkown error');
            }
        }
    };

    xhr.open('POST','api.letourneau.io/api/score', true);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send( JSON.stringify(form_data) );
}