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
const templateElement = document.querySelector('.template-element').content;
const popupAddElementInputName = document.querySelector('#popupAddElementInputName');
const popupAddElementInputLink = document.querySelector('#popupAddElementInputLink');

function createElement(item) {
  const element = templateElement.querySelector('.element').cloneNode(true);
  element.querySelector('.element__pic-caption').textContent = item.name;
  const picture = element.querySelector('.element__pic');
  picture.src = item.link;
  picture.alt = item.name;
  element.querySelector('.element__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
  element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
  picture.addEventListener('click', showPicturePopupHandler);
  return element;
}

function appendElement(item) {
  const element = createElement(item);
  elements.append(element);
}

function prependElement(item) {
  const element = createElement(item);
  elements.prepend(element);
}

function addElementButtonHandler() {
  const form = popupAddElement.querySelector(config.formSelector);
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

popupAddElement.addEventListener('mouseup', handleOverlay);


elementAddButton.addEventListener('click', addElementButtonHandler);
popupAddElementForm.addEventListener('submit', addElementSubmitHandler);


/* Отображение карточки в попапе */
const popupForPicture = document.querySelector('#popupPicture');
const popupPicture = document.querySelector('.popup__picture');
const popupPicCapture = document.querySelector('.popup__picCapture');

function showPicturePopupHandler(evt) {
  popupPicture.src = evt.target.src;
  popupPicture.alt = evt.target.alt;
  popupPicCapture.textContent = evt.target.alt;
  showPopup(popupForPicture);
}

popupForPicture.addEventListener('mouseup', handleOverlay);

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








