function showNumberWithAnimation (i, j, randNumber) {
	var numberCell = $('#number-cell-' + i + '-' + j)
	numberCell.css('background-color', getNumberBackgroundColor(randNumber))
	numberCell.css('color', getNumberColor(randNumber))
	numberCell.text(randNumber)

	//动画效果
	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		// 原本是0的数字格定位是0，0
		top: getPosTop(i),
		left: getPosLeft(j)
	}, 50)
}

function showMoveAnimation (fromx, fromy, tox, toy) {
	var numberCell = $('#number-cell-' + fromx + '-' + fromy)
	numberCell.animate({
		top: getPosTop(tox),
		left: getPosLeft(toy)
	}, 200)
}

function updateSocre (score) {
	$('#score').text(score)
}
