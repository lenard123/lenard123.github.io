var board = []

var players = {
	PLAYER1: 1,
	PLAYER2: 2,
	AI: 3
}

var modes = {
	MULTIPLAYER: 1,
	AI: 2
}

var DEPTH = 6

var piece = 1
var mode
var turn
var playing = false
var droping = false

function displayBoard() {
	for (var row = 0; row < 6; row++)
	{
		for (var col = 0; col < 7; col++)
		{
			var cell = document.getElementById(`${row}-${col}`)
			if (board[row][col] == 0) {
				cell.className = 'white'
			} else if (board[row][col] == 1) {
				cell.className = 'red'
			} else if (board[row][col] == 2) {
				cell.className = 'yellow'
			} 
		}
	}
}

function placeTurn(col, ai)
{
	if (!playing) return
	if (board[0][col] != 0) return
	if (turn == players.AI && ai == false) return
	if (droping) return
	dropPiece(col, 0, piece)
	piece = piece == 1 ? 2 : 1
}

function start(game_mode) {
	document.getElementById('buttons').style.display = 'none';
	turn = players.PLAYER1;
	playing = true;
	clearBoard();
	showPlayer();
	mode = game_mode
}

function gameOver()
{
	var message
	if(getValidMoves().length == 0) {
		message = 'Draw'
	} else {
		if (turn == players.PLAYER1) {
			message = 'Player 1 Wins'
		} else if (mode == modes.MULTIPLAYER) {
			message = 'Player 2 Wins'
		} else {
			message = 'AI Wins'
		}
	}
	var x = confirm(message+'\nDo you want to play again?')
	clearBoard()
	if (x) {
		if (mode == modes.MULTIPLAYER) {
			turn = turn == players.PLAYER1 ? players.PLAYER2 : players.PLAYER1
		} else {
			turn = turn == players.PLAYER1 ? players.AI : players.PLAYER1
			if (turn == players.AI) {
				setTimeout(function(){
					var best_move = findBestMove(piece)
					placeTurn(best_move.col, true)
				}, 1000)
			}
		}
		showPlayer()
	} else {
		playing = false
		document.getElementById('player').style.display = 'none';
		document.getElementById('buttons').style.display = '';
	}
}

function showPlayer()
{
	var x = document.getElementById('player');
	x.style.display = 'block';
	if (turn == players.PLAYER1) x.innerHTML = 'Player 1 turn';
	if (turn == players.PLAYER2) x.innerHTML = 'Player 2 turn';
	if (turn == players.AI) x.innerHTML = 'AI turn';
}

function findBestMove(piece)
{
	var valid_turns = getValidMoves()
	loopcount = 0
	var best = -1000
	var best_move = []
	for (var i = 0; i < valid_turns.length; i++)
	{
		board[valid_turns[i].row][valid_turns[i].col] = piece
		var score = minimax(0, false, piece)
		board[valid_turns[i].row][valid_turns[i].col] = 0
		valid_turns[i].score = score
		if (score > best) {
			best_move = [valid_turns[i]]
			best = score
		} else if (score == best) {
			best_move.push(valid_turns[i])
		}
	}
	console.log(loopcount)
	return best_move[Math.floor(Math.random()*best_move.length)]
}
var loopcount
function minimax(depth, isMax, piece, alpha, beta)
{
	loopcount++
	var score = evaluate(piece)
	var valid_turns = getValidMoves()
	if (score == 1000 || score == -1000) {
		return score
	} else if (valid_turns.length == 0 || depth == DEPTH) {
		return 0
	}

	if (isMax) {
		var best = -1000
		for (var i = 0; i < valid_turns.length; i++)
		{
			board[valid_turns[i].row][valid_turns[i].col] = piece
			best = Math.max(best, minimax(depth+1, false, piece, alpha, beta))
			alpha = Math.max(alpha, best)
			board[valid_turns[i].row][valid_turns[i].col] = 0
			if (beta <= alpha) {
				break
			}
		}
		return best - depth
	} else {
		var best = 1000
		for (var i = 0; i < valid_turns.length; i++)
		{
			board[valid_turns[i].row][valid_turns[i].col] = piece == 1 ? 2 : 1
			best = Math.min(best, minimax(depth+1, true, piece, alpha, beta))
			beta = Math.min(best, beta)
			board[valid_turns[i].row][valid_turns[i].col] = 0
			if (beta <= alpha) {
				break
			}
		}
		return best + depth
	}
}

function evaluate(piece)
{
	for (var row = 0; row < 6; row++)
	{
		for (var col = 0; col < 4; col++){
			var cell = board[row][col];
			if (cell == 0) continue;
			var i = 1;
			for (; i < 4; i++){
				if (cell != board[row][col+i]) break;
			}
			if (i == 4) {
				if (cell == piece) return 1000;
				else return -1000;
			}
		}
	}
	for (var col = 0; col < 7; col++)
	{
		for (var row = 0; row < 3; row++)
		{
			var cell = board[row][col];
			if (cell == 0) continue;
			var i = 1;
			for (; i < 4; i++){
				if (cell != board[row+i][col]) break;
			}
			if (i == 4) {
				if (cell == piece) return 1000;
				else return -1000;
			}
		}
	}
	for (var row = 0; row < 3; row++)
	{
		for (var col = 0; col < 4; col++)
		{
			var cell = board[row][col];
			if (cell == 0) continue;
			var i = 1;
			for (; i < 4; i++)
			{
				if (cell != board[row+i][col+i]) break;
			}
			if (i == 4) {
				if (cell == piece) return 1000;
				else return -1000;
			}
		}
		for (var col = 6; col > 2; col--)
		{
			var cell = board[row][col];
			if (cell == 0) continue;
			var i = 1;
			for (; i < 4; i++)
			{
				if (cell != board[row+i][col-i]) break;
			}
			if (i == 4) {
				if (cell == piece) return 1000;
				else return -1000;
			}
		}
	}

	return 0;
}

function clearBoard()
{
	board = []
	for (var row = 0; row < 6; row++)
	{	
		var x = []
		for (var col = 0; col < 7; col++) 
		{
			x.push(0)
		}
		board.push(x)
	}
	displayBoard()
}

function dropPiece(col, row, piece)
{
	droping = true
	board[row][col] = piece
	displayBoard();
	if (row + 1 < 6 && board[row+1][col] == 0)
	{
		setTimeout(function(){
			board[row][col] = 0
			dropPiece(col, row+1, piece)
		},50)
		return
	} else {
		droping = false
		if (check() || getValidMoves().length == 0) {
			gameOver()
			return
		}
		if (mode == modes.MULTIPLAYER) {
			turn = turn == players.PLAYER1 ? players.PLAYER2 : players.PLAYER1
		} else {
			turn = turn == players.PLAYER1 ? players.AI : players.PLAYER1
			if (turn == players.AI) {
				setTimeout(function(){
					var best_move = findBestMove(piece==1?2:1)
					placeTurn(best_move.col, true)
				}, 1000)
			}
		}
		showPlayer()		
	}
}

function check()
{
	for (var row = 0; row < 6; row++)
	{
		for (var col = 0; col < 4; col++){
			var cell = board[row][col];
			if (cell == 0) continue;
			var i = 1;
			for (; i < 4; i++){
				if (cell != board[row][col+i]) break;
			}
			if (i == 4) return true;
		}
	}
	for (var col = 0; col < 7; col++)
	{
		for (var row = 0; row < 3; row++)
		{
			var cell = board[row][col];
			if (cell == 0) continue;
			var i = 1;
			for (; i < 4; i++){
				if (cell != board[row+i][col]) break;
			}
			if (i == 4) return true;
		}
	}
	for (var row = 0; row < 3; row++)
	{
		for (var col = 0; col < 4; col++)
		{
			var cell = board[row][col];
			if (cell == 0) continue;
			var i = 1;
			for (; i < 4; i++)
			{
				if (cell != board[row+i][col+i]) break;
			}
			if (i == 4) return true;
		}
		for (var col = 6; col > 2; col--)
		{
			var cell = board[row][col];
			if (cell == 0) continue;
			var i = 1;
			for (; i < 4; i++)
			{
				if (cell != board[row+i][col-i]) break;
			}
			if (i == 4) return true;
		}
	}

	return false;
}

function getValidMoves()
{
	var valid_turns = [];
	for (var col = 0; col < 7; col++)
	{
		if (board[0][col] != 0) continue;
		for (var row = 1; row < 6; row++)
		{
			if (board[row][col] != 0) {
				valid_turns.push({'row':row-1, 'col':col});
				break;
			}
			else if (row == 5) {
				valid_turns.push({'row':row, 'col':col})
			}
		}
	}
	return valid_turns;
}

clearBoard()