const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const popupSubmitButton = document.querySelector('.popup__form_button_submit');
const popupInputName = document.querySelector('.popup__form_input_name');
const profileName = document.querySelector('.profile__name');
const popupInputDescription = document.querySelector('.popup__form_input_description');
const profileDescription = document.querySelector('.profile__description');

function closePopup() {
    popup.classList.remove('popup_opened');
}

function openPopup() {
    popup.classList.add('popup_opened');

}

function submitForm(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup();
}

function popupClickHandler(event) {
    if (event.target.classList.contains('popup')) {
        closePopup();
    }
}

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('mouseup', popupClickHandler);

popupForm.addEventListener('submit', submitForm);