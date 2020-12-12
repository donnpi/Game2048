var board = new Array()
var score = 0
var hasConficted = new Array() // 解决多次叠加问题

$(document).ready(function () {
	newgame()
})

function newgame () {
	// 初始化棋盘格的位置
	init()
	// 随机生成数字(游戏开始时要生成两个)
	generateOneNumber()
	generateOneNumber()
}

function init () {
	// 排列棋盘格
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-' + i + '-' + j)
			gridCell.css('top', getPosTop(i))
			gridCell.css('left', getPosLeft(j))
		}
	}
	// 使board变成二维数组
	for (var i = 0; i < 4; i++) {
		board[i] = new Array()
		hasConficted[i] = new Array()
		for (var j = 0; j < 4; j++) {
			// 游戏初始化时每个数字格为0
			board[i][j] = 0
			hasConficted[i][j] = false
		}
	}
	// 对数字格进行显示上的设定
	updateBoardView()
	// 分数归零
	score = 0
}

function updateBoardView () {
	// 新游戏开始，清除已有数字格
	$('.number-cell').remove()

	// 创建新的数字格
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
			var theNumberCell = $('#number-cell-' + i + '-' + j)
			// 数字为0时不显示
			if (board[i][j] == 0) {
				theNumberCell.css('width', '0px')
				theNumberCell.css('height', '0px')
			} else {
				theNumberCell.css('width', '100px')
				theNumberCell.css('height', '100px')
				theNumberCell.css('top', getPosTop(i))
				theNumberCell.css('left', getPosLeft(j))
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
				theNumberCell.css('color', getNumberColor(board[i][j]))
				theNumberCell.text(board[i][j])
			}
			hasConficted[i][j] = false;
		}
	}
}

function generateOneNumber () {
	if (nospace(board)) {
		return false
	}
	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4))
	var randy = parseInt(Math.floor(Math.random() * 4))

	//随机生成一个数字
	// 在随机位置生成随机数字
	//  优化:到后期会越来越慢,因为空格少了,要循环的次数多了
	var times = 0
	while (times < 50) { // 该位置已有数字则重新生成
		if (board[randx][randy] == 0) {
			break
		}
		randx = parseInt(Math.floor(Math.random() * 4))
		randy = parseInt(Math.floor(Math.random() * 4))
		times++
	}
	if (times == 50) { //　超过50次则手动指定
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] == 0) {
					randx = i
					randy = j
				}
			}
		}
	}
	// 以50：50的概率生成2和4
	var randNumber = Math.random() < 0.5 ? 2 : 4

	// 1，更新数据
	board[randx][randy] = randNumber
	// 2，以动画形式显示
	showNumberWithAnimation(randx, randy, randNumber)
	return true
}

// 游戏循环
$(document).keyup(function (e) {
	switch (e.keyCode) {
		case 37: // left
			if (moveLeft()) {
				// 避免没upate完就生成新数字,避免生成最后数组之前就显示结束
				// generateOneNumber()
				setTimeout('generateOneNumber()', 210)
				setTimeout('isgameover()', 300)
			}
			break
		case 38: // up
			if (moveUp()) {
				setTimeout('generateOneNumber()', 210)
				setTimeout('isgameover()', 300)
			}
			break
		case 39: // right
			if (moveRight()) {
				setTimeout('generateOneNumber()', 210)
				setTimeout('isgameover()', 300)
			}
			break
		case 40: // down
			if (moveDown()) {
				setTimeout('generateOneNumber()', 210)
				setTimeout('isgameover()', 300)
			}
			break
		default:
			break
	}
})

// 移动条件:1,有空格 2,数字相等&&目标位没有发生过碰撞
function moveLeft () {
	console.log('hhh')
	//  判断是否可以左移
	if (!canMoveLeft(board)) {
		return false
	}
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			// 判断是否能向左移动
			if (board[i][j] != 0) {
				// 1，检查每个元素左侧有无空&无阻隔(不明白为啥要检查无阻碍,反正是从最左移起啊)
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
						//move
						showMoveAnimation(i, j, i, k)
						// add
						board[i][k] = board[i][j]
						board[i][j] = 0
						continue
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConficted[i][k]) {
						// 2.左侧有相同数字
						// move
						showMoveAnimation(i, j, i, k)
						board[i][k] += board[i][j]
						board[i][j] = 0
						hasConficted[i][k] = true
						//add score
						score += board[i][k]
						updateSocre(score)
						continue
					}
				}
			}
		}
	}
	// 循环结束时,showMoveAnimation还没执行完,故使用计时器
	setTimeout('updateBoardView()', 200)
	return true
}

function moveUp () {
	// var origin = false // 测试版本
	if (!canMoveUp(board)) { return false }
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (board[k][j] == 0 || (board[k][j] == board[i][j] && !hasConficted[i][k])) {
						showMoveAnimation(i, j, k, j)
						board[k][j] += board[i][j]
						board[i][j] = 0
						hasConficted[k][j] = true
						score += board[k][j]
						updateSocre(score)
						// origin = true // 测试版本
						continue
					}
				}
			}
		}
	}
	// if (!origin) { return false } // 
	setTimeout('updateBoardView()', 200)
	return true
}

function moveDown () {
	if (!canMoveDown(board)) { return false }
	console.log('down');
	for (var i = 2; i > -1; i--) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {
					if (board[k][j] == 0 || (board[k][j] == board[i][j] && !hasConficted[i][k])) {
						showMoveAnimation(i, j, k, j)
						board[k][j] += board[i][j]
						board[i][j] = 0
						hasConficted[k][j] = true
						score += board[k][j]
						updateSocre(score)
						continue
					}
				}
			}
		}
	}
	setTimeout('updateBoardView()', 200)
	return true
}

function moveRight () {
	if (!canMoveRight(board)) { return false }
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j > -1; j--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (board[i][k] == 0 || (board[i][k] == board[i][j] && !hasConficted[i][k])) {
						showMoveAnimation(i, j, i, k)
						board[i][k] += board[i][j]
						board[i][j] = 0
						hasConficted[i][k] = true
						score += board[i][k]
						updateSocre(score)
						continue

					}
				}
			}
		}
	}
	setTimeout('updateBoardView()', 200)
	return true
}


function isgameover () {
	if (nospace(board) && nomove(board)) {
		gameover()
	}
}

function gameover () {
	alert('game ouvr')
}

