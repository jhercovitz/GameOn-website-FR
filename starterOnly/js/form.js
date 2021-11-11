const form = document.getElementById("myForm");
const confirmMessage = document.getElementById('confirm_submit')

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
        form.style.display = "none"; // ferme le form et laisse le modal ouvert
        document.getElementById("myForm").reset(); // reset form
        confirmMessage.style.display = "block"; // envoi du message de confirmation
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
    }
    if (Number(input) < 0) { // bloque les nombres negatifs
        quantityTournamentError.setAttribute('data-error', "Veuillez entrer un nombre positif.");
        quantityTournamentError.setAttribute('data-error-visible', 'true');
        return false
    } else {
        quantityTournamentError.setAttribute('data-error-visible', 'false');
        return true;
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

const closeConfirm = document.getElementById('close_confirm');
closeConfirm.addEventListener('click', () => { // ferme le message de confirmation d'envoi
    closeModal();
    form.style.display = "block"; // ré-ouvre le formulaire au clic
    confirmMessage.style.display = "none"; // empeche la ré-ouverture automatique du message de confirmation
})