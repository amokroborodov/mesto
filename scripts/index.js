/* Общая логика */
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_state_invalid',
  submitButtonSelector: '.popup__submit-button',
  submitButtonErrorClass: 'popup__submit-button_state_invalid',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error_visible'
}

function showPopup(popup) {
  popup.classList.remove('animationFadeOut');
  popup.classList.add('popup_opened', 'animationFadeIn');

  window.addEventListener('keydown', popupEscCloseHandler);
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened', 'animationFadeIn');
  popup.classList.add('animationFadeOut');

  window.removeEventListener('keydown', popupEscCloseHandler);
}

function popupEscCloseHandler(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');

    hidePopup(openedPopup);
  }
}



/*Закрытие попапов по нажатию на оверлей и крестик*/
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.addEventListener('mouseup', handleOverlay);
});

popups.forEach((popup) => {
  popup.addEventListener('click', closeHandler);
});

function closeHandler (evt) {
  if (evt.target.classList.contains('popup__close-button')) {
    hidePopup(evt.currentTarget);
  }
}

function handleOverlay (evt) {
  if (evt.target.classList.contains('popup')) {
    hidePopup(evt.target);
  }
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

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

    _createElement() {
      const element = document.querySelector(this._templateSelector).content.cloneNode(true);
      element.querySelector('.element__pic-caption').textContent = this._name;
      const picture = element.querySelector('.element__pic');
      picture.src = this._link;
      picture.alt = this._name;
      return element;
    }

    _handler(element) {
      element.querySelector('.element__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-button_active');
      });
      element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
      });
      // element.querySelector('.element__pic').addEventListener('click', showPicturePopupHandler);
    }

    buildElement() {
      const element = this._createElement();
      this._handler(element);

      return element;
    }
  }

//
// addElementButtonHandler() {
//   const form = document.querySelector('#popupAddElement').querySelector(config.formSelector);
//   setSubmitButtonState(form, config);
//   showPopup(popupAddElement);
// }
//
// _addElementSubmitHandler(event) {
//   event.preventDefault();
//
//   const name = popupAddElementInputName.value;
//   const link = popupAddElementInputLink.value;
//
//
//   _prependElement({name, link});
//
//   event.target.reset();
//
//   hidePopup(popupAddElement);
// }
//


function appendElement(item) {
  const element = new Card(item.name, item.link, templateElement);
  elements.append(element.buildElement());

}
//
// _prependElement(item) {
//   const element = _createElement(item);
//   elements.prepend(element);
// }
//
// popupAddElement.addEventListener('mouseup', handleOverlay);
//
//
// elementAddButton.addEventListener('click', addElementButtonHandler);
// popupAddElementForm.addEventListener('submit', addElementSubmitHandler);
//
//
// /* Отображение карточки в попапе */
// const popupForPicture = document.querySelector('#popupPicture');
// const popupPicture = document.querySelector('.popup__picture');
// const popupPicCapture = document.querySelector('.popup__picCapture');
//
// function showPicturePopupHandler(evt) {
//   popupPicture.src = evt.target.src;
//   popupPicture.alt = evt.target.alt;
//   popupPicCapture.textContent = evt.target.alt;
//   showPopup(popupForPicture);
// }
//
// popupForPicture.addEventListener('mouseup', handleOverlay);

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


// enableValidation(config);








