
var grid = []
var playing = false
var score = 0
var highscore = 0
var highest_piece = 0
var can_undo = false
var direction = {
	up: 	{x:0,	y:-1},
	down: 	{x:0,	y:1},
	left: 	{x:-1,  y:0},
	right: 	{x:1,	y:0}
}
var last_position = []

function store_board()
{
	can_undo = true
	last_position.forEach(function(cell, i){
		cell.value = grid[i].value
		cell.merged = false
		if (grid[i].element) {
			var element = grid[i].element.cloneNode()
			element.innerHTML = grid[i].element.innerHTML
			cell.element = element
		} else {
			cell.element = null
		}
	})
}

function init() {
	playing = true
	score = 0
	document.getElementById('game-over').style.display = 'none'
	document.getElementById('win').style.display = 'none'
	getTileContainer().innerHTML = ''
	grid = []
	for (var y = 0; y < 4; y++)
	{
		for (var x = 0; x < 4; x++)
		{
			grid.push({x,y,value:0, element: null, merged: false})
			last_position.push({x,y,value:0, element:null, merged: false})
		}
	}
	addRandomTile()
	addRandomTile()
}

function gameOver()
{
	playing = false
	document.getElementById('game-over').style.display = 'block'
}

function addRandomTile()
{
	var value = Math.random() < 0.9 ? 2 : 4;
	var cell = getRandomAvailableCell()
	createTile(cell, value)
}

function createTile(cell, value)
{
	var wrapper = document.createElement('div')
	var inner = document.createElement('div')
	wrapper.classList.add('tile', getPositionClass(cell.x, cell.y), 'tile-'+value)
	wrapper.appendChild(inner)
	inner.classList.add('tile-inner')
	inner.textContent = value
	cell.value = value
	cell.element = wrapper
	getTileContainer().appendChild(wrapper)
}

function getPositionClass(x, y)
{
	return 'tile-position-'+(x+1)+'-'+(y+1)
}

function getTileContainer()
{
	return document.getElementById('tile-container')
}

function getRandomAvailableCell()
{
	var available_cells = getAvailableCells()
	return available_cells[Math.floor(Math.random()*available_cells.length)]
}

function getAvailableCells()
{
	var available_cells = []
	for (var i = 0; i < 16; i++)
	{
		if (grid[i].value == 0) available_cells.push(grid[i])
	}
	return available_cells
}

trash_elements = []

function clean()
{	
	trash_elements.forEach(function(element){
		getTileContainer().removeChild(element)
	})
	trash_elements = []
	grid.forEach(function(cell){
		cell.merged = false
	})
}

function getCell(x, y)
{
	for (var i = 0; i < 16; i++)
	{
		if (grid[i].x == x && grid[i].y == y)
			return grid[i]
	}
	return null
}

function move(dir)
{
	if (!playing) return
	var moved = false
	store_board()
	for (var y = 0; y < 4; y++)
	{
		for (var x = 0; x < 4; x++)
		{
			if (dir == direction.down) {
				altY = 3-y
				altX = x
			} else if (dir == direction.up) {
				altY = y
				altX = x
			} else if (dir == direction.left) {
				altX = y
				altY = x
			} else if (dir == direction.right) {
				altX = 3-y
				altY = x
			}
			var cell = getCell(altX,altY)
			var value = cell.value
			var element = cell.element
			if (cell.value > 0) {
				var position = getFarthest(cell, dir)
				var next = position.next
				if (next && next.value == cell.value && !next.merged) {
					mergePosition(cell, next)
				} else if (cell != position.farthest) {
					var farthest = position.farthest
					movePosition(cell, farthest)
				}
				if (cell.value == 0) moved = true
 			}
		}
	}
	clean()
	if (moved) {
		addRandomTile()
		if (getAvailableCells().length == 0 && !hasMove()) {
			gameOver()
		}
	}
}


function hasMove()
{
	for (var x = 0; x < 4; x++)
	{
		for (var y = 0; y < 4; y++)
		{
			if (x < 3 && getCell(x,y).value == getCell(x+1, y).value)
				return true
			if (y < 3 && getCell(x,y).value == getCell(x,y+1).value)
				return true
		}
	}
	return false
}


function movePosition(from, to)
{
	//console.log(from, to)
	var value = from.value
	var element = from.element

	element.classList.remove(getPositionClass(from.x, from.y))
	element.classList.add(getPositionClass(to.x,to.y))
	
	to.value = value
	to.element = element
	from.element = null
	from.value = 0
}

function undo()
{
	if (!can_undo) return
	grid.forEach(function(cell,i){
		cell.value = last_position[i].value
		cell.merged = false
		if (cell.element) {
			getTileContainer().removeChild(cell.element)
			cell.element = null
		}
		if (last_position[i].element) {
			cell.element = last_position[i].element.cloneNode()
			cell.element.innerHTML = last_position[i].element.innerHTML
			getTileContainer().appendChild(cell.element)
		} 
	})
	can_undo = false
	playing = true
	document.getElementById('game-over').style.display = 'none'
}

function mergePosition(from, to)
{
	trash_elements.push(to.element)
	var value = from.value
	from.element.classList.remove(getPositionClass(from.x, from.y), 'tile-'+value)
	from.element.classList.add(getPositionClass(to.x,to.y), 'tile-'+(value*2))

	if (value*2 > highest_piece) {
		highest_piece = value*2
		if (highest_piece == 2048) {
			document.getElementById('win').style.display = 'block'
			playing = false
		}
	}

	score += value*2
	if (score > highscore) {
		highscore = score
	}
	document.getElementById('hiscore').textContent = highscore
	document.getElementById('score').textContent = score

	if (value >= 2048) {
		from.element.classList.add('tile-super')
	}

	to.element.classList.add('fade-out')
	to.element = from.element
	to.element.children[0].textContent = value*2
	to.value = from.value*2
	to.merged = true
	from.value = 0
	from.element = null
}

function ignore()
{
	document.getElementById('win').style.display = 'none'
	playing = true
}

function getFarthest(cell, direction)
{
	var previous
	do {
		previous = cell
		cell = getCell(cell.x+direction.x, cell.y+direction.y)
	} while(cell && cell.value == 0)
	return {farthest: previous, next: cell}
}



function withinBounds(cell)
{
	return cell.x >= 0 && cell.x < 4 && cell.y >= 0 && cell.y < 4
}

window.requestAnimationFrame(function () {
	document.body.onkeypress = (function(key){
		switch (key.keyCode) {
	    	case 37: move(direction.left); break; 
	    	case 38: move(direction.up); break;  
	    	case 39: move(direction.right); break; 
	    	case 40: move(direction.down); break; 
		}
	})	
})


init()
