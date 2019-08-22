const memory = {
	$fullList: $('ul'),
	$listItem: $(`li`),
	$counter: $(`.counter`),
	count: $('ul li').length,
	counter: 0
}

memory.getUserName = () => {
	memory.userName = prompt(`Hello and welcome to my memory game! Please enter your name and proceed to uncover the cards to see how quickly you can find all of the pairs!`)
	!memory.userName ? memory.userName = `friend` : null
	return memory.userName
}

memory.randomizeTiles = () => {
	const { count, $fullList } = memory
	for (let i = 1; i < count; i++) {
		let num = Math.floor(Math.random() * count)
		$('li', $fullList).eq(num).appendTo($fullList)
	}
}

memory.alertWinner = (winnerMessage) => {
	setTimeout(() => {
		const reload = confirm(`${winnerMessage}`)
		reload ? window.location.reload() : null 
	}, 2000)
	memory.matched.addClass('winner')
}

memory.assessWinner = () => {
	const { userName, counter, matched, alertWinner } = memory
	let winnerMessage = ``
	if (matched.length === 20) {
		if (counter <= 20) {
			winnerMessage = `Congratulations, ${userName}! You've beaten my memory game with a perfect score! How is that even possible?! I recommend you stop cheating.`
		} else if (counter <= 30) {
			winnerMessage = `Congratulations, ${userName}! You've beaten my memory game, and in only ${counter} clicks! Incredible job! Want to try again?`
		} else if (counter <= 40) {
			winnerMessage = `Congratulations, ${userName}! You've beaten my memory game, and it only took you ${counter} clicks. Good job, but can you do it in even less?`
		} else if (counter > 40) {
			winnerMessage = `Congratulations, ${userName}! You've beaten my memory game! But it took you ${counter} clicks. Maybe you want to try again?`
		}
		alertWinner(winnerMessage);
	}
}

memory.animateWrong = (cell) => {
	cell.removeClass(`clicked`).addClass(`wrong`)
	setTimeout(() => {
		cell.removeClass(`wrong`)
	}, 1000)
}

memory.animateMatch = (cell) => {
	cell.removeClass(`clicked`).addClass(`celebrate`);
	setTimeout(() => {
		cell.addClass(`matched`);
	}, 1000);
	memory.matched = $(`li`).filter(`.celebrate`);
	memory.assessWinner()
}

memory.checkMatch = (cell) => {
	if (cell[0].type === cell[1].type) {
		memory.animateMatch(cell)		
	}
	else {
		memory.animateWrong(cell)
	}
}

memory.filterClicked = () => {
	const $clickedCell = $(memory.$listItem.filter(`.clicked`))
	$clickedCell.length > 1 ? memory.checkMatch($clickedCell) : null
}

memory.addToCounter = function() {
	const cell = $(this)
	if (cell.hasClass(`clicked`) || cell.hasClass(`celebrate`) || cell.hasClass(`wrong`)) {
		null // do nothing 
	} else {
		memory.counter = memory.counter + 1
		memory.$counter.text(memory.counter)
		cell.addClass(`clicked`)
		memory.filterClicked()
	}
}

memory.onClick = () => {
	memory.$listItem.on(`click`, memory.addToCounter)
}

memory.init = () => {
	memory.randomizeTiles()
	memory.onClick()
	memory.getUserName()
}

$(() => {
	memory.init()
})