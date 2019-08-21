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
	const { matched } = memory
	setTimeout(() => {
		const reload = confirm(`${winnerMessage}`)
		reload ? window.location.reload() : null 
	}, 2000)
	matched.addClass('winner')
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

memory.checkMatch = () => {
	const { $clicked, assessWinner } = memory
	if ($clicked[0].type === $clicked[1].type) {
		$clicked.removeClass("clicked").addClass("celebrate");
		setTimeout(() => {
			$clicked.addClass("matched");
		}, 1000);
		memory.matched = $('li').filter('.celebrate');
		assessWinner()
	}
	else {
		$clicked.removeClass("clicked").addClass("wrong")
		setTimeout(function () {
			$clicked.removeClass("wrong")
		}, 1000)
	}
}

memory.filterClicked = () => {
	const clicked = memory.$listItem.filter('.clicked')
	memory.$clicked = $(clicked)
	clicked.length > 1 ? memory.checkMatch() : null
}

memory.addCounter = function() {
	let { counter, $counter, filterClicked } = memory
	memory.counter = counter + 1
	$counter.text(memory.counter)
	$(this).addClass(`clicked`)
	filterClicked($(this))
}

memory.onClick = () => {
	memory.$listItem.on('click', memory.addCounter)
}

memory.init = () => {
	memory.randomizeTiles()
	memory.onClick()
	memory.getUserName()
}

$(() => {
	memory.init();
});