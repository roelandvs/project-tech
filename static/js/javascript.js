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
    } else if (activeFieldset > fieldset.length - 1) {
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
    let activeGender = []; //in higher scope, array should't loop
    let activePreference = []; //in higher scope, array should't loop

    for (let i = 0; i < input.length; i++) {
        switch (input[i].getAttribute("name")) {
            case "firstName":
                if (input[i].value.length < 2 || input[i].value.length > 25) {
                    document.getElementById('error-name').innerHTML = 'Field must contain between 1-26 characters';
                    input[i].classList.add('invalid');
                    valid = false;
                } else if (input[i].classList.contains('invalid')) {
                    input[i].classList.remove('invalid');
                    document.getElementById('error-name').innerHTML = '';
                }
                break;

            case "email":
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input[i].value) == false) { //checks if the input is equal to the RegEx email structure
                	document.getElementById('error-email').innerHTML = 'Email should look like: name@examle.com';
                    input[i].classList.add('invalid');
                    valid = false;
                } else if (input[i].classList.contains('invalid')) {
                    input[i].classList.remove('invalid');
                    document.getElementById('error-email').innerHTML = '';
                }
                break;

            case "password":
                if (input[i].value == false) {
                	document.getElementById('error-password').innerHTML = 'Password should contain: ...';
                    input[i].classList.add('invalid');
                    valid = false;
                } else if (input[i].classList.contains('invalid')) {
                    input[i].classList.remove('invalid');
                	document.getElementById('error-password').innerHTML = '';
                }
                break;

            case "birthday":
                if (input[i].value == false) {
                	document.getElementById('error-birthday').innerHTML = 'Enter a date';
                    input[i].classList.add('invalid');
                    valid = false;
                } else if (input[i].classList.contains('invalid')) {
                    input[i].classList.remove('invalid');
                    document.getElementById('error-birthday').innerHTML = '';
                }
                break;

            case "gender":
                let gender = input[i].checked; //checks if input is true or false
                if (gender == false) {
                    activeGender.push(gender); //push "false" to activeGender
                }

                if (activeGender.length == 2) { //if both inputs are false there is no input
                    input[i].classList.add('invalid');
                	document.getElementById('error-gender').innerHTML = 'Enter a gender';
                    valid = false;
                } else if (input[i].classList.contains('invalid')) {
                	input[i].classList.remove('invalid');
                    document.getElementById('error-gender').innerHTML = '';
                }
                break;

            case "preference":
                let preference = input[i].checked;
                if (preference == false) {
                    activePreference.push(preference);
                }

                if (activePreference.length == 2) {
                	document.getElementById('error-preference').innerHTML = 'Enter at least one preference';
                    input[i].classList.add('invalid');
                    valid = false;
                } else if (input[i].classList.contains('invalid')) {
                	input[i].classList.remove('invalid');
                    document.getElementById('error-preference').innerHTML = '';
                }
                break;

            case "profilePicture":
                if (input[i].value == false) {
                	document.getElementById('error-profilePicture').innerHTML = 'Select an image';
                    input[i].classList.add('invalid');
                    valid = false;
                } else if (input[i].classList.contains('invalid')) {
                    input[i].classList.remove('invalid');
                	document.getElementById('error-profilePicture').innerHTML = '';
                }
                break;

            case "description":
            	//button is not a next button so it doest run call addCounter();
                if (input[i].value == false) {
                	document.getElementById('error-description').innerHTML = 'Tell something about yourself';
                    input[i].classList.add('invalid');
                    valid = false;
                } else if (input[i].classList.contains('invalid')) {
                    input[i].classList.remove('invalid');
                	document.getElementById('error-description').innerHTML = '';
                }
                break;
        }

    }

    if (valid === true) {
        activeFieldset += 1;
        showContent();
    }

}

function subtractCounter() {
    activeFieldset -= 1;
    previousContent();
}

for (let i = 0; i < fieldset.length; i++) {
    button[i].addEventListener('click', addCounter);
}

for (let i = 0; i < previousButton.length; i++) {
    previousButton[i].addEventListener('click', subtractCounter);
}
