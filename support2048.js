function getPosTop (i) {
	return 20 + i * 120
}
function getPosLeft (j) {
	return 20 + j * 120
}
function getNumberBackgroundColor (num) {
	switch (num) {
		case 2: return "#eee4da"; break
		case 4: return "#ede0c8"; break
		case 8: return "#f2b179"; break
		case 16: return "#f59563"; break
		case 32: return "#f67c5f"; break
		case 64: return "#f65e3b"; break
		case 128: return "#edcf72"; break
		case 256: return "#edcc61"; break
		case 512: return "#9c0"; break
		case 1024: return "#33b5e5"; break
		case 2048: return "#09c"; break
		case 4096: return "#a6c"; break
		case 8192: return "#93c"; break
	}
}

function getNumberColor (num) {
	if (num <= 4) {
		return '#776e65'
	}
	return '#fff'
}

// 判断是否有空格子
function nospace (board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				return false
			}
		}
	}
	return true
}

// 判断是否可以移动,检查每个格子是否有空or相同数字
function canMoveLeft (board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			// 限定数字格需由值,否则两个连续的空格也会触发事件
			if (board[i][j] != 0) {
				if (board[i][j - 1] == 0 || board[i][j] == board[i][j - 1]) {
					return true
				}
			}
		}
	}
	return false
}
function canMoveUp (board) {
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
					return true
				}
			}
		}
	}
	return false
}

function canMoveDown (board) {
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
					return true
				}
			}
		}
	}
	return false
}

function canMoveRight (board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j > -1; j--) {
			if (board[i][j] != 0) {
				if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
					return true
				}
			}
		}
	}
	return false
}


function noBlockHorizontal (row, col1, col2, board) {
	// 落脚点于目标之间是否有障碍
	for (var i = col1 + 1; i < col2; i++) {
		if (board[row][i] != 0) {
			return false
		}
	}
	// 通过则没有障碍物
	return true
}

function nomove (board) {
	if (
		canMoveLeft(board) ||
		canMoveUp(board) ||
		canMoveDown(board) ||
		canMoveRight(board)
	) { return false }
	return true
}
