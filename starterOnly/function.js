console.log(formData[0])

//Messages d'erreur
document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault();
    checkFirstName(document.getElementById('first').value) // vérifie la valeur saisie par l'utlisateur
    checkLastName(document.getElementById('last').value)
    checkEmail(document.getElementById('email').value)
    checkBirthdate(document.getElementById('birthdate').value)
    checkQuantityTournament(document.getElementById('quantity').value)
    checkRadio(document.getElementsByClassName('checkbox-input').value)
    checkCheckbox(document.getElementById('checkbox1').value)
});

function isEmpty(input) { //function appelée pour la date anniversaire et les tournois
    if (input === "") {
        return false
    }
}

function minTwoChar(input) { // au moins deux charactères doivent être saisies
    if (input.length < 2) {
        return false
    }
    return true
}

function checkFirstName(input) {
    const firstNameError = formData[0];
    if (!minTwoChar(input)) {
        firstNameError.setAttribute('data-error', 'Veuillez entrer 2 caractères ou plus pour ce champ');
        firstNameError.setAttribute('data-error-visible', 'true'); // affiche le message d'erreur
        return false;
    } else {
        firstNameError.setAttribute('data-error-visible', 'false'); // masque le message d'erreur 
        return true;
    }
}

function checkLastName(input) {
    const lastNameError = formData[1];
    if (minTwoChar(input) === false) {
        lastNameError.setAttribute('data-error', 'Veuillez entrer 2 caractères ou plus pour ce champ');
        lastNameError.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        lastNameError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

function checkEmail(input) {
    const emailError = formData[2];
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        emailError.setAttribute('data-error', 'l\'email n\'est pas valide');
        emailError.setAttribute('data-error-visible', 'true');
        return false
    } else {
        emailError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

function checkBirthdate(input) { // Une date anniversaire valide doit être saisie
    let today = new Date();
    let year = today.getFullYear();

    if (isEmpty(input) === false) {
        const birthdateError = formData[3];
        birthdateError.setAttribute('data-error', 'Vous devez entrer votre date de naissance.');
        birthdateError.setAttribute('data-error-visible', 'true');
        return false;
        // } else if ( checkBirthDate > year - 16) {
        //     birthdateError.setAttribute('data-error', 'Vous devez avoir plus de 16 ans.');
        //     birthdateError.setAttribute('data-error-visible', 'true');
        //     return false;
    } else {
        birthdateError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

function checkQuantityTournament(input) {
    if (isEmpty(input) === false) {
        const quantityTournamentError = formData[4];
        quantityTournamentError.setAttribute('data-error', "Vous devez choisir une option.");
        quantityTournamentError.setAttribute('data-error-visible', 'true');
        return false
    } else {
        quantityTournamentError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

// lier les 2 fonctions pour devoir selectionner le nombre de villes correspondant au nombre de tournois selectionnés 

function checkRadio() {
    let allRadio = document.getElementsByClassName('checkbox-input');
    for (let i = 0; i < allRadio.length; i++) {
        if (!allRadio[i].checked) {
            const cities = formData[5];
            cities.setAttribute('data-error', 'Vous devez choisir une ville.');
            cities.setAttribute('data-error-visible', 'true');
        } else {
            cities.setAttribute('data-error-visible', 'false');
            return true;
        }
    }
}

function checkCheckbox() {
    const generalCondition = document.getElementById('checkbox1');
    if (!generalCondition.checked) {
        const generalConditionError = formData[6];
        generalConditionError.setAttribute('data-error', 'Vous devez vérifier que vous acceptez les termes et conditions.');
        generalConditionError.setAttribute('data-error-visible', 'true');
    } else {
        generalConditionError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

// Message d'envoi

function form_validate(e) { // ne fonctionne pas
    const confirmSubmit = document.getElementById("confirm_submit");
    confirmSubmit.addEventListener('click')
    e.preventDefault();
}

if (form.click == true && checkFirstName == true && checkLastName == true && checkEmail == true && checkBirthdate == true &&
    checkQuantityTournament == true && checkRadio == true && checkCheckbox == true) {
    console.log("formulaire envoyé!");
} else {
    console.log("Tous les champs doivent être remplis");
}