
var snake_loc; //Location of Snake
var move; //direction of snake
var score = 0;
var hi_score = 0;
var speed;
var canMove;
var playing = false

var food = {
	row: null,
	col: null
}

var direction = {
	UP: [-1, 0],
	LEFT: [0, -1],
	DOWN: [1, 0],
	RIGHT: [0, 1]
}

function moveSnake()
{
    var head = [
    	snake_loc[snake_loc.length-1][0] + move[0],
    	snake_loc[snake_loc.length-1][1] + move[1]
    ]

    if (head[0] == ROW) {
    	head[0] = 0
    } else if (head[0] == -1) {
    	head[0] = ROW-1
    } else if (head[1] == COL) {
    	head[1] = 0
    } else if (head[1] == -1) {
    	head[1] = COL-1
    }

    //if head hit body
    if (snake_loc.some((loc)=>(loc[0]==head[0] && loc[1]==head[1]))) {
    	gameOver();
    	return;
    }

    snake_loc.push(head);

    //if head hit food
    if (head[0] == food.row && head[1] == food.col) {
    	score++;
    	placeFood()
    } else {
    	var tail = snake_loc.shift();
    	document.getElementById(`${tail[0]}-${tail[1]}`).className = ''
    }

    placeSnake();
    canMove = true;
    if (playing){
    	setTimeout(moveSnake, speed-(score*1.75));
    }

}

function gameOver()
{
	var message = "";
	if (score > hi_score) {
		message = "You're now the highest score'\n"
		hi_score = score
	}
	message += "Do you want to play again?";
	var restart = confirm(message);
	if (restart) {
		start();
	} else {
		playing = false;
		score = 0;
		document.getElementById('startBtn').style.display='';
		document.getElementById('controls').style.display='none';
	}
}

function changeMove(new_direction)
{
	if (!canMove) return
	canMove = false
	if (move == direction.UP && new_direction == direction.DOWN) return;
	if (move == direction.DOWN && new_direction == direction.UP) return;
	if (move == direction.LEFT && new_direction == direction.RIGHT) return;
	if (move == direction.RIGHT && new_direction == direction.LEFT) return;
	move = new_direction;
}

function placeSnake()
{
	for (var i = 0 ; i < snake_loc.length; i++)
	{
		var cell = document.getElementById(`${snake_loc[i][0]}-${snake_loc[i][1]}`);
		cell.className = 'snake-body'
	}
}

function clearBoard()
{
	for (var i = 0; i < ROW; i++)
	{
		for (var j = 0; j < COL; j++)
		{
			document.getElementById(`${i}-${j}`).className = '';
		}
	}
}

function placeFood()
{
    document.getElementById("score").innerHTML = score;
    document.getElementById("hiscore").innerHTML = hi_score;
    food.row = Math.floor(Math.random() * ROW)
    food.col = Math.floor(Math.random() * COL)

    if (snake_loc.some(loc=>(loc[0]==food.row && loc[1]==food.col))) {
        placeFood();
    }

    var cell = document.getElementById(food.row+'-'+food.col);
    cell.className = "food";
}

function start()
{
	document.getElementById('startBtn').style.display='none';
	document.getElementById('controls').style.display='';
	snake_loc = [[8,2],[8,3],[8,4]];
	move = direction.RIGHT;
	score = 0;
	speed = 150;
	canMove = true;
	clearBoard();
	placeSnake();	
	playing = true;
	moveSnake();
	placeFood();
    document.body.onkeypress = (key) => {
            
        if (key.keyCode != 0){
            switch (key.keyCode) {
                case 37: changeMove(direction.LEFT); break; 
                case 38: changeMove(direction.UP); break;  
                case 39: changeMove(direction.RIGHT); break; 
                case 40: changeMove(direction.DOWN); break; 
            }
        }else{
            switch(key.key) {
                case 'w': changeMove(direction.UP); break;
                case 'a': changeMove(direction.LEFT); break;
                case 's': changeMove(direction.DOWN); break;
                case 'd': changeMove(direction.RIGHT); break;
            }
        }

    }
}
