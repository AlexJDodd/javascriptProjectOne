$(document).ready(() => {

		let userName = prompt(`Hello and welcome to my memory game! What is your name?`);

 		const list = $('ul');
		const count = $('ul li').length;

		for (let i = 1; i < count; i++) {
			let j = Math.floor(Math.random() * count);
			$('li', list).eq(j).appendTo(list);
		}

		let counter = 0;

 		$("ul li").on('click', function() {

 			counter = counter + 1;
			$('.counter').text(counter);

			$(this).addClass("clicked");
			
			let clickedSymbols = $('li').filter('.clicked');
				
			if(clickedSymbols[0].type === clickedSymbols[1].type) {

				$(clickedSymbols).removeClass("clicked").addClass("celebrate");
				setTimeout(function() {
					$(clickedSymbols).addClass("matched");
				}, 800);
			
				let matchedSymbols = $('li').filter('.celebrate');

				if (matchedSymbols.length == 20 && counter <= 20) {	
					setTimeout(function() {
						let reload = confirm (`Congratulations, ${userName}! You've beaten my memory game with a perfect score! How is that even possible?!`)
						if (reload) {
						  window.location.reload();
						} else {				  
						};
					}, 1400);
					$(matchedSymbols).addClass('winner');
					
				}

				else if (matchedSymbols.length == 20 && counter < 30) {	
					setTimeout(function() {
						let reload = confirm (`Congratulations, ${userName}! You've beaten my memory game! And in less than 30 clicks! Amazing job!`)
						if (reload) {
						  window.location.reload();
						} else {				  
						};
					}, 1400);
					$(matchedSymbols).addClass('winner');
				}

				else if (matchedSymbols.length == 20 && counter <= 40) {	
					setTimeout(function() {
						let reload = confirm (`Congratulations, ${userName}! You've beaten my memory game admirably! Good job, but can you do it in even less clicks?`)
						if (reload) {
						  window.location.reload();
						} else {
						};
					}, 1400);
					$(matchedSymbols).addClass('winner');
				}

				else if (matchedSymbols.length == 20 && counter > 40) {	
					setTimeout(function() {
					let reload = confirm (`Congratulations, ${userName}! You've beaten my memory game! But it sure took you a lot of tries. Maybe try again?`)
					if (reload) {
					  window.location.reload();
					} else {				  
					};
					}, 1400);
					$(matchedSymbols).addClass('winner');
				}
			}

			else if(clickedSymbols[0].type !== clickedSymbols[1].type) {

				$(clickedSymbols).removeClass("clicked").addClass("wrong")
				setTimeout(function() {
					$(clickedSymbols).removeClass("wrong")
				}, 850);
			}
		});
	});
	
//I left my pseudocode here for your interest. I didn't work out exactly like this, but it was my thought process as of Saturday morning.

		//create a listening event for clicking the icons
		//when clicked run a filter to create a new array of cards with the class of clicked
		// create an if statement that says that if the new array has less than 2 cards to
		//change the icon font size and background color to yellow using addClass
		//create an else if statement that says if the new array has two cards with the class of clicked that have matching id's, change the font size and background color to green using addClass
		//create an else statement that says that as a last resort, the card (this) and also the previous card you clicked (wtf?) reset the font size and background color using removeClass
		//create a map that checks the new array for the number of cards
		//create an if statement that says that if the deck array has the right number of cards, a winning dialogue is created
		
		//if time
		//ask for user's name at the start
		//congratulate user by name at the end

		//if crazy
		//make it timed