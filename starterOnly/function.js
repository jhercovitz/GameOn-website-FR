document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault();
    const isFirstNameValid = checkFirstName(document.getElementById('first').value) // vérifie la valeur saisie par l'utlisateur
    const isLastNameValid = checkLastName(document.getElementById('last').value)
    const isEmailValid = checkEmail(document.getElementById('email').value)
    const isBirthdateValid = checkBirthdate(document.getElementById('birthdate').value)
    const isQuantityValid = checkQuantityTournament(document.getElementById('quantity').value)
    const isRadioValid = checkRadio(document.getElementsByClassName('checkbox-input').value)
    const ischeckboxValid = checkCheckbox(document.getElementById('checkbox1').value)

    // on valide que tous les champs soient ok pour envoyer le formulaire
    if (isFirstNameValid && isLastNameValid && isEmailValid && isBirthdateValid && isQuantityValid && isRadioValid && ischeckboxValid) {
        const modalcl = document.getElementById("myForm");
        modalcl.style.display = "none"; // ferme le form
        document.getElementById("myForm").reset(); // reset form

    }

    // envoi du message de confirmation
    // ne fonctionne pas
    const confirmMessage = document.getElementById('confirm_submit');

    document.getElementsByClassName("btn-submit").addEventListener("click", launchconfirm);

    function launchconfirm() {
        confirmMessage.style.display = "block";
        console.log("message envoyé");
    }
});



//Messages d'erreur

function isEmpty(input) { //function appelée pour la date anniversaire et les tournois
    if (input === "") {
        return false
    }
    return true
}

function minTwoChar(input) { // au moins deux charactères doivent être saisies
    if (input.length < 2) {
        return false
    }
    return true
}

function checkFirstName(input) { // l'utilisateur doit remplir ce champ
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

function checkLastName(input) { // l'utilisateur doit remplir ce champ
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

function checkEmail(input) { // l'utilisateur doit entrer une adresse mail valide
    const emailError = formData[2];
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,64})+$/.test(input)) {
        emailError.setAttribute('data-error', 'l\'email n\'est pas valide');
        emailError.setAttribute('data-error-visible', 'true');
        return false
    } else {
        emailError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

function checkBirthdate(input) {
    let usersbirthdate = new Date(input); // recuperere la date saisie par l'utilisateur
    let currentDate = new Date() // recupere la date du jour
    let usersAge = Math.floor((currentDate - usersbirthdate) / (31557600000)); // compare les 2 dates
    const birthdateError = formData[3];
    if (isEmpty(input) === false) { // l'utilisateur doit remplir ce champ
        birthdateError.setAttribute('data-error', 'Veuillez entrer votre date de naissance.');
        birthdateError.setAttribute('data-error-visible', 'true');
        return false
    }
    if (usersAge < 18) { // l'utilisateur doit être majeur
        birthdateError.setAttribute('data-error', 'Vous devez avoir plus de 18 ans.');
        birthdateError.setAttribute('data-error-visible', 'true');
        return false;
    } else {
        birthdateError.setAttribute('data-error-visible', 'false');
        return true;

    }
}

function checkQuantityTournament(input) { // l'utilisateur doit remplir ce champ
    const quantityTournamentError = formData[4];
    if (isEmpty(input) === false) {
        quantityTournamentError.setAttribute('data-error', "Veuillez choisir une option.");
        quantityTournamentError.setAttribute('data-error-visible', 'true');
        return false
    } else {
        quantityTournamentError.setAttribute('data-error-visible', 'false');
        return true;
    }
}

let number = document.getElementById('quantity'); // bloque les nombres negatifs
number.onkeydown = function(e) {
    if (!((e.keyCode > 95 && e.keyCode < 106) || // correspond aux pavés numériques 0 à 9 
            (e.keyCode > 47 && e.keyCode < 58) || // correspond à 0 à 9 sur la ligne numérique 
            e.keyCode == 8)) { // 8 est le retour arrière
        return false;
    }
}

function checkRadio() { // l'utilisateur doit selectionner une ville
    const citiesError = formData[5];
    let allRadio = document.getElementsByName('location');

    let isChecked = false;
    for (let i = 0; i < allRadio.length; i++) {
        if (allRadio[i].checked) {
            isChecked = true;
        }
    }
    if (isChecked) {
        citiesError.setAttribute('data-error-visible', 'false');
        return true;
    } else {
        citiesError.setAttribute('data-error', 'Veuillez choisir une ville.');
        citiesError.setAttribute('data-error-visible', 'true');
        return false;
    }

}

function checkCheckbox() { // l'utilisateur doit accepter les termes et conditions
    const generalCondition = document.getElementById('checkbox1');
    const generalConditionError = formData[6];
    if (!generalCondition.checked) {
        generalConditionError.setAttribute('data-error', 'Merci d\'acceptez les termes et conditions.');
        generalConditionError.setAttribute('data-error-visible', 'true');
    } else {
        generalConditionError.setAttribute('data-error-visible', 'false');
        return true;
    }
}