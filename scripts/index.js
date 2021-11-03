/* Общая логика */

function showPopup(popup) {
  popup.classList.remove('animationFadeOut');
  popup.classList.add('popup_opened', 'animationFadeIn');
}

function hidePopup(popup) {
  popup.classList.remove('popup_opened', 'animationFadeIn');
  popup.classList.add('animationFadeOut');
}

/* Редактирование профиля */
const popupEditProfile = document.querySelector('#popupEditProfile');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('#editProfileCloseButton');
const popupEditProfileInputName = document.querySelector('#popupEditProfileInputName');
const profileName = document.querySelector('.profile__name');
const popupEditProfileInputDescription = document.querySelector('#popupEditProfileInputDescription');
const profileDescription = document.querySelector('.profile__description');
const popupEditProfileForm = document.querySelector('#popupEditProfileForm');


function handleProfileEditClose() {
  hidePopup(popupEditProfile);
}

function handleProfileEditOpen() {
  popupEditProfileInputName.value = profileName.textContent;
  popupEditProfileInputDescription.value = profileDescription.textContent;

  showPopup(popupEditProfile);
}

function handleProfileSubmit(event) {
  event.preventDefault();

  profileName.textContent = popupEditProfileInputName.value;
  profileDescription.textContent = popupEditProfileInputDescription.value;

  hidePopup(popupEditProfile);
}


profileEditButton.addEventListener('click', handleProfileEditOpen);
editProfileCloseButton.addEventListener('click', handleProfileEditClose);
popupEditProfileForm.addEventListener('submit', handleProfileSubmit);

/* Добавление карточки */
const popupAddElement = document.querySelector('#popupAddElement');
const elementAddButton = document.querySelector('.profile__add-button');
const addElementCloseButton = document.querySelector('#addElementCloseButton');
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
  element.querySelector('.element__pic').addEventListener('click', showPicturePopupHandler);
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
  showPopup(popupAddElement);
}

function closeElementPopupHandler() {
  hidePopup(popupAddElement);
}

function addElementSubmitHandler(event) {
  event.preventDefault();

  const name = popupAddElementInputName.value;
  const link = popupAddElementInputLink.value;


  prependElement({name, link});

  event.target.reset();

  hidePopup(popupAddElement);
}


elementAddButton.addEventListener('click', addElementButtonHandler);
addElementCloseButton.addEventListener('click', closeElementPopupHandler);
popupAddElementForm.addEventListener('submit', addElementSubmitHandler);


/* Отображение карточки в попапе */
const popupForPicture = document.querySelector('#popupPicture');
const popupPictureCloseButton = document.querySelector('#popupPictureCloseButton');
const popupPicture = document.querySelector('.popup__picture');
const popupPicCapture = document.querySelector('.popup__picCapture');

function showPicturePopupHandler(evt) {
  popupPicture.src = evt.target.src;
  popupPicture.alt = evt.target.alt;
  popupPicCapture.textContent = evt.target.alt;
  showPopup(popupForPicture);
}

function closePicturePopupHandler() {
  hidePopup(popupForPicture);
}

popupPictureCloseButton.addEventListener('click', closePicturePopupHandler);

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



