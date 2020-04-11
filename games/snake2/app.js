
var score
var HEIGHT = 30
var WIDTH = 30
var SIZE = 15
var SPEED = 150
var playing = false
var direction = {
	up: {x:0, y:-1},
	down: {x:0, y:+1},
	left: {x:-1, y:0},
	right: {x:+1, y:0}
}
var changingDir = false
var food = {}

var snake
var dir = direction.right

function move()
{
	if (!playing) return
	var prev, temp 
	snake.forEach(function(body, i){
		if (i == 0) {
			prev = {x:body.x,y:body.y}
			body.x += dir.x
			body.y += dir.y
		} else {
			temp = {x:prev.x, y:prev.y}
			prev = {x:body.x, y:body.y}
			body.x = temp.x
			body.y = temp.y
		}
	})

	if (snake[0].x == food.x && snake[0].y == food.y) {
		eatFood(temp)
	}

	if (hitTheBox() || hitTheBody()) {
		playing = false
	}else{
		displaySnake()
	}
	changingDir = false
	setTimeout(move, SPEED)
}

function eatFood(body)
{
	addBody(body.x, body.y)
	getBoard().removeChild(food.element)
	placeFood()
}

function hitTheBox()
{
	var head = snake[0]
	return head.x < 0 ||head.x > WIDTH-1 || head.y<0||head.y>HEIGHT-1
}

function hitTheBody()
{
	for (var i = 1; i < snake.length; i++)
	{
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
			return true
	}
	return false
}

function init() {
	var board = getBoard()
	setBoardSize(HEIGHT*SIZE, WIDTH*SIZE)
}

function start() {
	playing = true
	snake = [{x:4, y:1, element: null}]
	document.getElementById('start').style.display = 'none'
	addBody(3,1)
	addBody(2,1)
	move()
	placeFood()
	score = 0
}

function addBody(x,y)
{
	var lastmove = snake[snake.length-1].move
	snake.push({x,y,element:null, move: lastmove})
	displaySnake()
}

function displaySnake()
{
	snake.forEach(function(body, i){
		if (body.element == null) {
			body.element = createBody(body.x, body.y)
		} else {


			updatePosition(body)
			if (i > 0 && i < snake.length-1) {
				var x = body.x, y = body.y
				if ((snake[i-1].x < x && snake[i+1].y > y) || (snake[i+1].x < x && snake[i-1].y > y)) {
					body.element.classList.add('corner-top-right')
				} else if ((snake[i-1].x > x && snake[i+1].y > y) || (snake[i+1].x > x && snake[i-1].y > y)) {
					body.element.classList.add('corner-top-left')
				} else if ((snake[i-1].x > x && snake[i+1].y < y) || (snake[i+1].x > x && snake[i-1].y < y)) {
					body.element.classList.add('corner-bottom-left')
				} else if ((snake[i-1].x < x && snake[i+1].y < y) || (snake[i+1].x < x && snake[i-1].y < y)){
					body.element.classList.add('corner-bottom-right')
				}else {
					body.element.classList.remove(
						'corner-top-right', 
						'corner-bottom-right',
						'corner-bottom-left',
						'corner-top-left')
				}
			}
		}
	})
	setHeadClass(snake[0].element)
}
/*0		1		2

1 1		1 2
1 2
1 3

x y		x y		x y
1 1		2 1 	3 1
				3 2		3
 */
function setHeadClass(head)
{
	head.classList.remove('snake-head-up', 'snake-head-right', 'snake-head-left', 'snake-head-down')
	if (dir == direction.right)
		head.classList.add('snake-head-right')
	else if (dir == direction.left)
		head.classList.add('snake-head-left')
	else if (dir == direction.up)
		head.classList.add('snake-head-up')
	else if (dir == direction.down)
		head.classList.add('snake-head-down')
}

function updatePosition(body)
{
	setPositionStyle(body.element, body.x, body.y)
}

function createBody(x, y)
{
	var body = document.createElement('div')
	var board = getBoard()
	body.classList.add('snake-body')
	setPositionStyle(body, x, y)
	board.appendChild(body)
	return body
}

function setPositionStyle(body, x, y)
{
	body.style.height = SIZE + 'px'
	body.style.width = SIZE + 'px'
	body.style.transform = `translate(${SIZE*x}px, ${SIZE*y}px)`

}

function createFood()
{
	var element = document.createElement('div')
	element.classList.add('food')
	setPositionStyle(element, food.x, food.y)
	getBoard().appendChild(element)
	return element
}

function getBoard()
{
	return document.getElementById('board')
}

function setBoardSize(height, width)
{
	var board = getBoard()
	board.style.height = height+'px'
	board.style.width = width+'px'
}

function changeDir(direction)
{
	if (playing && !isOpposite(direction) && !changingDir)
	dir = direction
	changingDir = true
}

function isOpposite(move) {
	var opposites = [
		[direction.down, direction.up],
		[direction.up, direction.down],
		[direction.left, direction.right],
		[direction.right, direction.left]
	]
	for (var i = 0; i < 4; i++)
	{
		if (dir==opposites[i][0] && move==opposites[i][1])
			return true
	}
	return false
}

document.body.onkeypress = (function(key){
	switch (key.keyCode) {
	    case 37: changeDir(direction.left); break; 
	    case 38: changeDir(direction.up); break;  
	    case 39: changeDir(direction.right); break; 
	    case 40: changeDir(direction.down); break; 
	}	
})

function placeFood()
{
	food.x = Math.floor(Math.random()*WIDTH)
	food.y = Math.floor(Math.random()*HEIGHT)
	for (var i = 0; i < snake.length; i++)
	{
		if (snake[i].x == food.x && snake[i].y == food.y)
			return placeFood()
	}
	food.element = createFood()
}

init()