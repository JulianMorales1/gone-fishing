const colors = require('colors');
const prompt = require('prompt-sync')({ sigint: true });

let fishNames = ['Crappie', 'Bass', 'Sunfish', 'Catfish', 'Walleye', 'Pike'];
let caughtFishes = [];

let weightSum = 0;
let valueSum = 0;

function generateFish() {
	let name = fishNames[Math.floor(Math.random() * 6)];
	let weight = Math.random() * 4;
	let value = Math.random() * 11;
	let fish = { name, weight, value };
	return fish;
}

function startGame() {
	console.log("You've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish.".green);

	let timeSpin = 'am';
	for (let hour = 6; hour <= 12; hour++) {
		

		if (hour === 12) {
			timeSpin = 'pm';
		}
		console.log('The time is ' + hour +':00' + timeSpin + '. So far you have caught:\n' + caughtFishes.length + ' fish, ' + weightSum.toFixed(2) + ' lbs, $' + valueSum.toFixed(2));

		let caughtFish = generateFish();

		console.log('You have caught' + caughtFish.name + 'weighting' + caughtFish.weight.toFixed(2) + 'lbs and valued at $' + caughtFish.value.toFixed(2).yellow);

		let userInput = prompt('Your action [c]atch or [r]ealease: ');
		if (userInput === 'c') {
			weight = weightSum + caughtFish.weight;
			if (weight >= 10) {
				console.log(
					'This fish will put you over 10 lbs, you must release.'.underline.blue);
			} else {
				caughtFishes.push(caughtFish);
				weightSum += caughtFish.weight;
				valueSum += caughtFish.value;
				console.log('You choose to keep the fish'.green);
			}
		} else {
			console.log('You have released the fish'.pink);
		}

		if (hour === 12) {
			console.log('Game is over'.bgBrightRed);
		}
	}
}


startGame();
