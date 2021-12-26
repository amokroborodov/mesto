
export class FormValidator {
  constructor(config, form) {
    this.config = config;
    this.form = form;
  }

  _setFormListeners() {
    this.form.addEventListener('submit', this._handleSubmit);
    this.form.addEventListener('input', () => this._setSubmitButtonState())
    const inputs = [...this.form.querySelectorAll(this.config.inputSelector)];
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => this._handleFieldValidation(inputElement));
    })
  }

  _setSubmitButtonState() {
    const button = this.form.querySelector(this.config.submitButtonSelector);
    button.disabled = !this.form.checkValidity();
    button.classList.toggle(this.config.submitButtonErrorClass, !this.form.checkValidity())
  }

  _handleSubmit(evt) {
    evt.preventDefault();
  }

  _handleFieldValidation(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement)
    } else {
      this._hideError(inputElement)
    }
  }

  _showError(inputElement) {
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.add(this.config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement) {
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = '';
  }

  enableValidation() {
    this._setFormListeners();
  }
}



