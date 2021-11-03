export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_state_invalid',
    submitButtonSelector: '.popup__submit-button',
    submitButtonErrorClass: 'popup__submit-button_state_invalid',
    inactiveButtonClass: 'popup__submit-button_disabled',
    errorClass: 'popup__error_visible'
}

export function enableValidation(config) {
    const forms = [...document.querySelectorAll(config.formSelector)];
    forms.forEach((form) => setFormListeners(form, config));
}

function setFormListeners(form, config) {
    form.addEventListener('submit', handleSubmit);
    form.addEventListener('input', () => setSubmitButtonState(form, config))
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => handleFieldValidation(inputElement, form, config))
    })

    setSubmitButtonState(form, config);
}

function handleSubmit(evt) {
    evt.preventDefault();
}

function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);

    button.disabled = !form.checkValidity();
    button.classList.toggle('config.submitButtonErrorClass', !form.checkValidity())
}

function handleFieldValidation(inputElement, form, config) {
    if (!inputElement.validity.valid) {
        showError(inputElement, form, config)
    } else {
        hideError(inputElement, form, config)
    }
}

function showError(inputElement, form, config) {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.add(config.inputErrorClass);

    errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, form, config) {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(config.inputErrorClass);

    errorElement.textContent = '';
}

enableValidation(config);
