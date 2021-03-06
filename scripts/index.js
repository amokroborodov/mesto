import {Card} from "./Card.js";
import {showPopup, hidePopup, handleOverlay} from "./popups.js";
import {FormValidator} from "./FormValidator.js";
import Section from "./Section.js";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_state_invalid',
  submitButtonSelector: '.popup__submit-button',
  submitButtonErrorClass: 'popup__submit-button_state_invalid',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error_visible'
}

const validators = {};

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

  showPopup(popupEditProfile, validators[popupEditProfileForm.id]);
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
const templateElementSelector = '.template-element';
const popupAddElementInputName = document.querySelector('#popupAddElementInputName');
const popupAddElementInputLink = document.querySelector('#popupAddElementInputLink');

function addElementSubmitHandler(event) {
  event.preventDefault();

  const name = popupAddElementInputName.value;
  const link = popupAddElementInputLink.value;

  prependElement({name, link});

  event.target.reset();

  hidePopup(popupAddElement);
}

function prependElement(item) {
  const element = new Card(item.name, item.link, templateElementSelector);
  elements.prepend(element.buildElement());
}

popupAddElement.addEventListener('mouseup', handleOverlay);

elementAddButton.addEventListener('click', () => {
  showPopup(popupAddElement, validators[popupAddElementForm.id]);
});
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

const initialCards = new Section({
  items: initialElements, renderer: (item) => {
    const element = new Card(item.name, item.link, templateElementSelector);
    initialCards.addItem(element.buildElement());
  }
}, elements);
initialCards.renderItems();

const forms = document.querySelectorAll(config.formSelector);
forms.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();

  validators[form.id] = validator;
});

