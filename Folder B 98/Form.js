const contactForm = document.getElementById("contactForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
        displayError(nameError, 'Please Type Your Name.');
        isValid = false;
    } else {
        clearError(nameError);
    }
    if (emailInput.value.trim() === '') {
        displayError(emailError, 'Please Type a Valid E-mail.');
        isValid = false;
    } else {
        clearError(nameError);
    }
    if (messageInput.value.trim() === '') {
        displayError(messageError, 'Please Type Your Message.');
        isValid = false;
    } else {
        clearError(nameError);
    }
    if (isValid) {
        displayMessage('Message sent Successfully', 'success');
        contactForm.reset();
    } else {
        displayMessage ('Please Correct the Mistakes in the Form.', 'error');
    }
}
function displayError(element, message) {
    element.textContent = message;
}
function clearError(element) {
    element.textContent = '';
}
function isValidEmeil (email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function displayMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}