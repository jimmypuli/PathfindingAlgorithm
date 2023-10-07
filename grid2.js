var collection = document.getElementsByClassName("grid-item");
let targetID; 
let array = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
]
start = [0,0]; 
end = [];
location1 = [0,0]; 

for(let i = 0; i < collection.length; i++){
    collection[i].addEventListener("mouseover", hover);
    collection[i].addEventListener("mouseleave", hover);
    collection[i].addEventListener("click", hover)
}

function executeCode(){
    end.push(parseInt(targetID[0]));
    end.push(parseInt(targetID[1]));
    let count = 0; 
    let flag = true; 
    while(flag){ 
        console.log("TARGET ID: " + targetID);
        let moves = checkMoves(location1); 
        console.log("Possible moves: " + moves);
        let moveToMake = checkDistance(moves, targetID);
        console.log("Best move to make: " + moveToMake);
        if(moveToMake === "Diagonal"){
            location1 = moveDiagonal(location1); 
            let x = location1[0].toString(); 
            let y = location1[1].toString(); 
            let id = x.concat(y); 
            let element = document.getElementById(id); 
            element.style.backgroundColor = 'orange';
        }else if(moveToMake === "Right"){
            location1 = moveRight(location1); 
            let x = location1[0].toString(); 
            let y = location1[1].toString(); 
            let id = x.concat(y); 
            let element = document.getElementById(id); 
            element.style.backgroundColor = 'orange';
        }else if( moveToMake === "Down"){
            location1 = moveDown(location1); 
            let x = location1[0].toString(); 
            let y = location1[1].toString(); 
            let id = x.concat(y); 
            let element = document.getElementById(id); 
            element.style.backgroundColor = 'orange';
        }
        if(moveToMake == null) flag = false; 
        console.log("location update:" + location1);
        console.log("\n");
        count++;
    }  
}

function checkMoves(pos){
    let a = []
    posFromMoving = moveDiagonal(pos);
    if(posFromMoving[0] >= 0 && posFromMoving[1] >= 0 && posFromMoving[0] < 15 && posFromMoving[1] < 15) a.push("Diagonal"); 
    posFromMoving = moveRight(pos);
    if(posFromMoving[0] >= 0 && posFromMoving[1] >= 0 && posFromMoving[0] < 15 && posFromMoving[1] < 15) a.push("Right");
    posFromMoving = moveLeft(pos); 
    // if(posFromMoving[0] >= 0 && posFromMoving[1] >= 0 && posFromMoving[0] < 3 && posFromMoving[1] < 3) a.push("Left");
    posFromMoving = moveDown(pos); 
    if(posFromMoving[0] >= 0 && posFromMoving[1] >= 0 && posFromMoving[0] < 15 && posFromMoving[1] < 15) a.push("Down");
    return a; 
}


function checkDistance(moves, tID){
    var bestMove; 
    var diagonalRect; 
    var rightRect;
    var downRect; 
    var endElement= document.getElementById(tID); 
    var endRect = endElement.getBoundingClientRect(); 
    for(let i = 0; i < moves.length; i++){
        if(moves[i] === "Diagonal"){
            diagonalRect = getdiagonalXY(location1); 
        }else if(moves[i] == "Right"){
            rightRect = getrightXY(location1); 
        }else if(moves[i] == "Down"){
            downRect = getdownXY(location1); 
        }
    }
    //lower right hand corner of grid based on next move taken 
    //used to see which move's corner on grid is closest to the target upper left corner
    console.log("before modification down XY"); 
    console.log(downRect.x + " " + downRect.y);


    let diagonalX = diagonalRect.x + 31; 
    let diagonalY = diagonalRect.y + 31; 
    let rightX = rightRect.x + 31; 
    let rightY = rightRect.y + 31; 
    let downX = downRect.x + 31; 
    let downY = downRect.y + 31; 

    console.log("FOCUS POINTS BOTTOM RIGHT CORNERS:");
    console.log("DIAGONAL GRID BOTTOM RIGHT POINT: (" + diagonalX + " , " + diagonalY + ")"); 
    console.log("RIGHT GRID BOTTOM RIGHT POINT: (" + rightX + " , " + rightY + ")"); 
    console.log("BOTTOM GRID BOTTOM RIGHT POINT: (" + downX + " , " + downY + ")"); 

    console.log("TARGET TOP LEFT CORNER: " + "(" + endRect.x + " , " + endRect.y + ")"); 

    let diffX; 
    let diffY; 
    let diffX1; 
    let diffY1; 
    let diffX2; 
    let diffY2; 
    if(diagonalX >= endRect.x){
        diffX = diagonalX - endRect.x; 
    }else{
        diffX = endRect.x - diagonalX;
    }
    if(diagonalY >= endRect.y){
        diffY = diagonalY - endRect.y; 
    }else{
        diffY = endRect.y - diagonalY; 
    }

    if(rightX >= endRect.x){
        diffX1 = rightX - endRect.x;
    }else{
        diffX1 = endRect.x - rightX;
    }
    if(rightY >= endRect.y){
        diffY1 = rightY - endRect.y; 
    }else{
        diffY1 = endRect.y - rightY;
    }

    if(downX >= endRect.x){
        diffX2 = downX - endRect.x; 
    }else{
        diffX2 = endRect.x - downX;  
    }
    if(downY >= endRect.y){
        diffY2 = downY - endRect.y; 
    }else{
        diffY2 = endRect.y - downY; 
    }


    console.log("diffX, diffY: " + diffX + " " + diffY);
    console.log("diffX1, diffY1: " + diffX1 + " " + diffY1);
    console.log("diffX2, diffY2: " + diffX2 + " " + diffY2); 

    
    if((diffX == 0 && diffY == 0) || diffX <= diffX1 && diffX <= diffX2){
        if(diffY <= diffY1 && diffY <= diffY2){
            return bestMove = "Diagonal"; 
        }
    }

    if((diffX1 == 0 && diffY1 == 0) || diffX1 <= diffX && diffX1 <= diffX2){
        if(diffY1 <= diffY && diffY1 <= diffY2){
            return bestMove = "Right";
        }
    }

    if((diffX2 == 0 && diffY2 == 0) || diffX2 <= diffX && diffX2 <= diffX1){
        if(diffY2 <= diffY && diffY2 <= diffY1){
            return bestMove = "Down";
        }
    }

}

function getdiagonalXY(position){
    let newLocation = moveDiagonal(position); 
    let x = newLocation[0].toString();
    let y = newLocation[1].toString();
    let id = x.concat(y); 
    let element = document.getElementById(id); 
    //element.style.backgroundColor = 'orange';
    elementCoord = element.getBoundingClientRect(); 
    return elementCoord;
}

function getrightXY(position){
    let newLocation = moveRight(position); 
    let x = newLocation[0].toString();
    let y = newLocation[1].toString();
    let id = x.concat(y); 
    let element = document.getElementById(id); 
    //element.style.backgroundColor = 'blue';
    elementCoord = element.getBoundingClientRect(); 
    return elementCoord;
}

function getdownXY(position){
    console.log("***Getting down grid XY***");
    console.log("POSITION: " + position);
    let newLocation = moveDown(position); 
    console.log("down grid XY axis: " + newLocation); 
    let x = newLocation[0].toString();
    let y = newLocation[1].toString();
    let id = x.concat(y); 
    let element = document.getElementById(id); 
    //element.style.backgroundColor = 'purple';
    elementCoord = element.getBoundingClientRect(); 
    console.log("***exiting getting down...***"); 
    return elementCoord;
}



function moveRight(location1){
    let right = [location1[0], location1[1] + 1]; 
    return right; 
}

function moveLeft(location1){
    let left = [location1[0], location1[1] - 1]; 
    return left; 
}

function moveDiagonal(location1){
    let diagonal = [location1[0] + 1, location1[1] + 1]; 
    return diagonal; 
}

function moveDown(location1){
    console.log("Movin down....");
    console.log("Addy: " + location1);  
    let down = [location1[0] + 1, location1[1]]; 
    console.log("down dawg: " + down + " Finished!"); 
    return down; 
}

function hover(event){ 
    if(event.type == "mouseover" && this.className != "red"){
        this.style.backgroundColor = "yellow";
    }else if(event.type == "click"){
        this.style.backgroundColor = "red"; 
        this.className = "red"; 
        setTarget(this.id);
        var redCoordinates = this.getBoundingClientRect();
        executeCode(); 
    }else if(this.className != "red"){
        this.style.backgroundColor = "whitesmoke";
    }
}

function setTarget(id){
    targetID = id; 
}



