const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const popupInputName = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__name');
const popupInputDescription = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');

function closePopup() {
    popup.classList.remove('popup_opened');
}

function openPopup() {
    popup.classList.add('popup_opened');
    popupInputName.value = profileName.textContent;
    popupInputDescription.value = profileDescription.textContent;
}

function submitForm(event) {
    event.preventDefault();
    profileName.textContent = popupInputName.value;
    profileDescription.textContent = popupInputDescription.value;
    closePopup();
}

// function popupClickHandler(event) {
//     if (event.target.classList.contains('popup')) {
//         closePopup();
//     }
// }

profileEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);
// popup.addEventListener('mouseup', popupClickHandler);

popupForm.addEventListener('submit', submitForm);