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

var piece = 'X';
var mode
var turn
var playing = false

function displayBoard()
{
	for (var i = 0; i < 3; i++)
	{
		for (var j = 0; j < 3; j++)
		{
			document.getElementById(`${i}-${j}`).innerHTML = board[i][j]
		}
	}
}

function placeTurn(i, j, ai) {
	if (!playing) return
	if (board[i][j] != '') return;
	if (turn == players.AI && ai == undefined) return

	board[i][j] = piece;
	displayBoard();
	piece = piece == 'X' ? 'O' : 'X';

	if (check() || getValidMoves().length == 0) {
		gameOver();
		return
	}

	if (mode == modes.MULTIPLAYER) {
		turn = turn == players.PLAYER1 ? players.PLAYER2 : players.PLAYER1
		showPlayer();

	} else {

		turn = turn == players.PLAYER1 ? players.AI : players.PLAYER1
		if (turn == players.AI) {
			showPlayer();
			setTimeout(function(){
				var best_move = findBestMove(piece)
				placeTurn(best_move[0], best_move[1], true)
			}, 1000)
		}

	}

}

function gameOver()
{
	var message
	if (getValidMoves().length == 0) {
		message = "Draw"
	} else {
		if (turn == players.PLAYER1) 
			message = "Player 1 Wins"
		else if (mode == modes.MULTIPLAYER)
			message = "Player 2 Wins"
		else 
			message = "AI Wins"
	}
	var x = confirm(message+"\nDo you want to play again?");
	clearBoard();
	if (x) {
		if (mode == modes.MULTIPLAYER) {
			turn = turn == players.PLAYER1 ? players.PLAYER2 : players.PLAYER1
		} else {
			turn = turn == players.PLAYER1 ? players.AI : players.PLAYER1
			if (turn == players.AI) {
				showPlayer();
				setTimeout(function(){
					var best_move = findBestMove(piece)
					placeTurn(best_move[0], best_move[1], true)
				}, 1000)
			}
		}
		showPlayer();
	} else {
		playing = false
		document.getElementById('player').style.display = 'none';
		document.getElementById('buttons').style.display = '';
	}
}

function clearBoard()
{
	board = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	]
	displayBoard();
}

function getValidMoves()
{
	var valid_moves = [];
	for (var i = 0; i < 3; i++)
	{
		for (var j = 0; j < 3; j++)
		{
			if (board[i][j] == '') valid_moves.push([i,j])
		}
	}
	return valid_moves;
}

function check()
{
	var diagonal1 = 0
	var diagonal2 = 0

	for (var i = 0; i < 3; i++)
	{

		if (board[0][0] != '' && board[i][i] == board[0][0]) diagonal1++
		if (board[0][2] != '' && board[i][2-i] == board[0][2]) diagonal2++

		if (board[i][0] != '') {
			var j = 1;
			for (; j < 3; j++)
			{
				if (board[i][j] != board[i][0]) break;
			}
			if (j == 3) return true;
		}

		if (board[0][i] != ''){ 
			var j = 1;
			for (; j < 3; j++)
			{
				if (board[j][i] != board[0][i]) break;
			}
			if (j == 3) return true;
		}

	}
	if (diagonal1 == 3 || diagonal2 == 3) return true
	return false;
}

function showPlayer() {
	var x = document.getElementById('player');
	x.style.display = 'block';
	if (turn == players.PLAYER1) x.innerHTML = 'Player 1 turn';
	if (turn == players.PLAYER2) x.innerHTML = 'Player 2 turn';
	if (turn == players.AI) x.innerHTML = 'AI turn';
}

function start(game_mode) {
	document.getElementById('buttons').style.display = 'none';
	turn = players.PLAYER1;
	playing = true;
	clearBoard();
	showPlayer();
	mode = game_mode
}

function minimax(isMax, piece)
{
	var score = evaluate(piece)
	var valid_moves = getValidMoves()

	if (score == Infinity || score == -Infinity)
		return score; 
	if (valid_moves.length == 0)
		return 0

	if (isMax) {
		var best = -Infinity
		for (var i = 0; i < valid_moves.length; i++)
		{
			board[valid_moves[i][0]][valid_moves[i][1]] = piece
			best = Math.max(best, minimax(false, piece))
			board[valid_moves[i][0]][valid_moves[i][1]] = ''
		}
		return best
	} else {
		var best = Infinity
		for (var i = 0; i < valid_moves.length; i++)
		{
			board[valid_moves[i][0]][valid_moves[i][1]] = piece == 'X' ? 'O' : 'X'
			best = Math.min(best, minimax(true, piece))
			board[valid_moves[i][0]][valid_moves[i][1]] = ''
		}
		return best
	}
}

function findBestMove(piece)
{
	var valid_turns = getValidMoves()
	var best = -Infinity
	var best_moves = []
	var scores = []
	for (var i = 0; i < valid_turns.length; i++)
	{
		board[valid_turns[i][0]][valid_turns[i][1]] = piece
		score = minimax(false, piece)
		board[valid_turns[i][0]][valid_turns[i][1]] = ''		
		if (score > best) {
			best_moves = [];
			scores = []
			best_moves.push(valid_turns[i]);
			best = score;
			scores.push(score);
		} else if (score == best) {
			best_moves.push(valid_turns[i]);
			scores.push(score)
		}
	}
	console.log(best_moves)
	console.log(scores);
	return best_moves[Math.floor(Math.random()*best_moves.length)];
}

function evaluate(piece)
{
	var diagonal1 = 0
	var diagonal2 = 0

	for (var i = 0; i < 3; i++)
	{

		if (board[0][0] != '' && board[i][i] == board[0][0]) diagonal1++
		if (board[0][2] != '' && board[i][2-i] == board[0][2]) diagonal2++

		if (board[i][0] != '') {
			var j = 1;
			for (; j < 3; j++)
			{
				if (board[i][j] != board[i][0]) break;
			}

			if (j == 3) {
		//		console.log(1)
				if (board[i][0] == piece) return Infinity
				else return -Infinity
			}
		}

		if (board[0][i] != '') {
			var j = 1;
			for (; j < 3; j++)
			{
				if (board[j][i] != board[0][i]) break;
			}
			if (j == 3) {
		//		console.log(2)
				if (board[0][i] == piece) return Infinity
				else return -Infinity
			}
		}

	}
	if (diagonal1 == 3) {
		//console.log(3)
		if (board[0][0] == piece) return Infinity
		else return -Infinity
	} 
	if (diagonal2 == 3) {
		//console.log(4)
		if (board[0][2] == piece) return Infinity
		else return -Infinity
	}

	return 0;
}
