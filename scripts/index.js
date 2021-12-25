import { Card } from "./card.js";
import { showPopup, hidePopup, handleOverlay } from "./popups.js";
import { enableValidation, setSubmitButtonState } from "./validation.js"

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_state_invalid',
  submitButtonSelector: '.popup__submit-button',
  submitButtonErrorClass: 'popup__submit-button_state_invalid',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error_visible'
}


/* Редактирование профиля */
const popupEditProfile = document.querySelector('#popupEditProfile');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfileInputName = document.querySelector('#popupEditProfileInputName');
const profileName = document.querySelector('.profile__name');
const popupEditProfileInputDescription = document.querySelector('#popupEditProfileInputDescription');
const profileDescription = document.querySelector('.profile__description');
const popupEditProfileForm = document.querySelector('#popupEditProfileForm');

function handleProfileEditOpen() {
  popupEditProfileInputName.value = profileName.textContent;
  popupEditProfileInputDescription.value = profileDescription.textContent;

  const form = popupEditProfile.querySelector(config.formSelector);
  setSubmitButtonState(form, config);

  showPopup(popupEditProfile);
}

function handleProfileSubmit(event) {
  event.preventDefault();

  profileName.textContent = popupEditProfileInputName.value;
  profileDescription.textContent = popupEditProfileInputDescription.value;

  hidePopup(popupEditProfile);
}

popupEditProfile.addEventListener('mouseup', handleOverlay);


profileEditButton.addEventListener('click', handleProfileEditOpen);
popupEditProfileForm.addEventListener('submit', handleProfileSubmit);


/* Добавление карточки */
const popupAddElement = document.querySelector('#popupAddElement');
const elementAddButton = document.querySelector('.profile__add-button');
const popupAddElementForm = document.querySelector('#popupAddElementForm');
const templateElement = '.template-element';
const popupAddElementInputName = document.querySelector('#popupAddElementInputName');
const popupAddElementInputLink = document.querySelector('#popupAddElementInputLink');

function addElementButtonHandler() {
  const form = document.querySelector('#popupAddElement').querySelector(config.formSelector);
  setSubmitButtonState(form, config);
  showPopup(popupAddElement);
}

function addElementSubmitHandler(event) {
  event.preventDefault();

  const name = popupAddElementInputName.value;
  const link = popupAddElementInputLink.value;

  prependElement({name, link});

  event.target.reset();

  hidePopup(popupAddElement);
}

function appendElement(item) {
  const element = new Card(item.name, item.link, templateElement);
  elements.append(element.buildElement());

}

function prependElement(item) {
  const element = new Card(item.name, item.link, templateElement);
  elements.prepend(element.buildElement());
}

popupAddElement.addEventListener('mouseup', handleOverlay);

elementAddButton.addEventListener('click', addElementButtonHandler);
popupAddElementForm.addEventListener('submit', addElementSubmitHandler);


/* Рендеринг списка */
const elements = document.querySelector('.elements');
const initialElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


initialElements.forEach(appendElement);


enableValidation(config);








