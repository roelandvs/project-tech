let fieldset = document.body.getElementsByTagName('fieldset');
// let nextButton = document.body.getElementsByClassName('btn-next-container');
let button = document.body.getElementsByClassName('btn-next');
let previousButton = document.body.getElementsByClassName('btn-previous');
let counter = 0;

showContent(); //makes all fieldsets invisible, except first one

function showContent() {
	console.log(fieldset, counter);
	if (counter === 0) {
		for (let i = 0; i < fieldset.length; i++) {
			fieldset[i].classList.add('makeInvisible');
		}
		fieldset[counter].classList.replace('makeInvisible', 'addVisibility');
	} else if (counter > fieldset.length - 1){
		console.log(einde);
	} else {
		fieldset[counter].classList.replace('makeInvisible', 'addVisibility');
		fieldset[counter - 1].classList.replace('addVisibility', 'makeInvisible');
	}
}

function previousContent() {
	console.log(fieldset, counter);
	fieldset[counter + 1].classList.replace('addVisibility', 'makeInvisible');
	fieldset[counter].classList.replace('makeInvisible', 'addVisibility');
}

function addCounter (){
	let input = fieldset[counter].getElementsByTagName('input');
	let valid = true;

	for (let i = 0; i < input.length; i++) {
		if (input[i].value == false) {
			input[i].classList.add('invalid');
			valid = false;
		}
	}

	if (valid === true) {
		counter += 1;
		showContent();
	}
}

function subtractCounter (){
	counter -= 1;
	previousContent();
}

for (let i = 0; i < fieldset.length; i++) {
	button[i].addEventListener('click', addCounter);
}

for (let i = 0; i < previousButton.length; i++) {
	previousButton[i].addEventListener('click', subtractCounter);
}