let fieldset = document.body.getElementsByTagName('fieldset');
// let nextButton = document.body.getElementsByClassName('btn-next-container');
let button = document.body.getElementsByClassName('btn-next');
let previousButton = document.body.getElementsByClassName('btn-previous');
let activeFieldset = 0;

showContent(); //makes all fieldsets invisible, except first one

function showContent() {
	if (activeFieldset === 0) {
		for (let i = 0; i < fieldset.length; i++) {
			fieldset[i].classList.add('makeInvisible');
		}
		fieldset[activeFieldset].classList.replace('makeInvisible', 'addVisibility');
	} else if (activeFieldset > fieldset.length - 1){
		console.log('einde');
	} else {
		fieldset[activeFieldset].classList.replace('makeInvisible', 'addVisibility');
		fieldset[activeFieldset - 1].classList.replace('addVisibility', 'makeInvisible');
	}
}

function previousContent() {
	fieldset[activeFieldset + 1].classList.replace('addVisibility', 'makeInvisible');
	fieldset[activeFieldset].classList.replace('makeInvisible', 'addVisibility');
}

function addCounter() {
	let input = fieldset[activeFieldset].getElementsByTagName('input'); //gets the inputs of the active Fieldset
	let valid = true;
	let activeGender = []; //in higher scope because it must save the array
	let activePreference = []; //in higher scope because it must save the array

	for (let i = 0; i < input.length; i++) {
 
		//switch selects wich cases it should run based on the attribute names that match input[i].getAttribute("name")
	    switch (input[i].getAttribute("name")) {
	        case "firstName":
	            if (input[i].value.length < 2) { //checks if input is 2 characters of more
	                input[i].classList.add('invalid');
	                valid = false;
	            }
	            break;

	        case "email":
	            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input[i].value) == false) { //checks if the input is equal to the RegEx objects definiton of an emailaddress
	                input[i].classList.add('invalid');
	                valid = false;
	            }
	            break;

	        case "password":
	            if (input[i].value == false) {
	                input[i].classList.add('invalid');
	                valid = false;
	            }
	            break;

	        case "birthday":
	            if (input[i].value == false) {
	                input[i].classList.add('invalid');
	                valid = false;
	            }
	            break;

	        case "gender":
	        	let gender = input[i].checked; //checks if input is true or false
	        	if (gender == false) {
	        		activeGender.push(gender); //push "false" to activeGender
	        	}

	            if (activeGender.length == 2) { //if both inputs are false there is no input
	                input[i].classList.add('invalid');
	                valid = false;
	            }
	            break;

	        case "preference":
	            let preference = input[i].checked;
	        	if (preference == false) {
	        		activePreference.push(preference);
	        	}

	            if (activePreference.length == 2) {
	                input[i].classList.add('invalid');
	                valid = false;
	            }
	            break;

    		case "profilePicture":
    			if (input[i].value == false) {
	                input[i].classList.add('invalid');
	                valid = false;
	            }
	            break;

       		case "description":
    			if (input[i].value == false) {
	                input[i].classList.add('invalid');
	                valid = false;
	            }
	            break;
	    }

	}

	if (valid === true) {
		activeFieldset += 1;
		showContent();
	}
}

function subtractCounter (){
	activeFieldset -= 1;
	previousContent();
}

for (let i = 0; i < fieldset.length; i++) {
	button[i].addEventListener('click', addCounter);
}

for (let i = 0; i < previousButton.length; i++) {
	previousButton[i].addEventListener('click', subtractCounter);
}

