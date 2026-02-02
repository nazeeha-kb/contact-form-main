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

const toast = document.getElementById("toast");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    validateInput();
    if (validateInput()) {
        showToast()
        form.reset()
    }
    // if success() is true then show toast
})

const showToast = () => {
    toast.classList.remove("hidden")

    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2000);
}

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
    outline.classList.add("outline-cust-red");
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
    outline.classList.remove("outline-cust-red");
    error.classList.add("hidden")
}

const validateInput = () => {
    let isValid = true;
    // First name
    if (firstName.value.trim() == '') {
        setErrorFields(firstName, 'This field is required');
        isValid = false;
    }
    else {
        setSuccessFields(firstName)
    }

    // Last name
    if (lastName.value.trim() == '') {
        setErrorFields(lastName, 'This field is required');
        isValid = false;
    }
    else {
        setSuccessFields(lastName)
    }

    // Email
    if (email.value.trim() == '') {
        setErrorFields(email, 'This field is required');
        isValid = false;
    }
    else if (!validateEmail(email.value.trim())) {
        setErrorFields(email, "please enter a valid email address")
        isValid = false;
    }
    else {
        setSuccessFields(email)
    }

    // query
    if (!querySelected()) {
        setErrorSelection(queryParent, 'Please select a query type');
        isValid = false;
    }
    else {
        setSuccessSelection(queryParent)
    }

    // message
    if (message.value.trim() == '') {
        setErrorFields(message, 'This field is required');
        isValid = false
    }
    else {
        setSuccessFields(message)
    }

    // checkbox
    if (!checkbox.checked) {
        setErrorSelection(checkbox, 'To submit this form, please consent to being contacted');
        isValid = false;
    }
    else {
        setSuccessSelection(checkbox)
    }

    return isValid;
}