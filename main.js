// Error state
// first name, last name, email, query, message, consent
const form = document.getElementById("form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");

const email = document.getElementById("email");
// run forEach and check if either is checked. If one is checked, checked = true else it remains checked = false; and if both unchecked display error
const general = document.getElementById("general");
const support = document.getElementById("support");
const queryParent = document.getElementById("query-parent")

const message = document.getElementById("message");
const checkbox = document.getElementById("consent");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    validateInput();
    // if success() is true then show toast
})

const querySelected = () => {
    let selected = false;
    if (support.checked || general.checked) {
        selected = true;
    }
    return selected;
}

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(String(email).toLowerCase());
}

const setErrorSelection = (element, errorMessage) => {

    const controller = element.parentElement;
    const error = controller.querySelector(".error-message");

    error.classList.remove("hidden");
    error.classList.add("block")
    error.innerHTML = `${errorMessage}`;
}

// red outline to be added
const setErrorFields = (element, errorMessage) => {
    const controller = element.parentElement;
    const outline = controller.querySelector(".cust-outline")
    const error = controller.querySelector(".error-message");

    error.classList.remove("hidden");
    error.classList.add("block")
    outline.classList.add("outline-red-700");
    error.innerHTML = `${errorMessage}`;
}

const setSuccessSelection = (element) => {
    const controller = element.parentElement;
    const error = controller.querySelector(".error-message");
    error.classList.add("hidden")
}

const setSuccessFields = (element) => {
    const controller = element.parentElement;
    const error = controller.querySelector(".error-message");
    const outline = controller.querySelector(".cust-outline")
    outline.classList.remove("outline-red-700");
    error.classList.add("hidden")
    console.log("success!")
}

const validateInput = () => {

    // First name
    if (firstName.value.trim() == '') {
        setErrorFields(firstName, 'This field is required');
    }
    else {
        setSuccessFields(firstName)
    }

    // Last name
    if (lastName.value.trim() == '') {
        setErrorFields(lastName, 'This field is required');
    }
    else {
        setSuccessFields(lastName)
    }

    // Email
    if (email.value.trim() == '') {
        setErrorFields(email, 'This field is required');
    }
    else if (!validateEmail(email.value.trim())) {
        setErrorFields(email, "please enter a valid email address")
    }
    else {
        setSuccessFields(email)
    }

    // query
    if (!querySelected()) {
        setErrorSelection(queryParent, 'Please select a query type');
    }
    else {
        setSuccessSelection(queryParent)
    }

    // message
    if (message.value.trim() == '') {
        setErrorFields(message, 'This field is required');
    }
    else {
        setSuccessFields(message)
    }

    // checkbox
    if (!checkbox.checked) {
        setErrorSelection(checkbox, 'To submit this form, please consent to being contacted');
    }
    else {
        setSuccessSelection(checkbox)
    }

}