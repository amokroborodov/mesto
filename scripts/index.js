const popupEditProfile = document.querySelector('#popupEditProfile');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('#editProfileCloseButton');
const popupEditProfileForm = document.querySelector('#popupEditProfileForm');
const popupEditProfileInputName = document.querySelector('#popupEditProfileInputName');
const profileName = document.querySelector('.profile__name');
const popupEditProfileInputDescription = document.querySelector('#popupEditProfileInputDescription');
const profileDescription = document.querySelector('.profile__description');


const popupAddElement = document.querySelector('#popupAddElement');
const elementAddButton = document.querySelector('.profile__add-button');
const addElementCloseButton = document.querySelector('#addElementCloseButton');
const popupAddElementForm = document.querySelector('#popupAddElementForm');
const popupAddElementInputName = document.querySelector('#popupAddElementInputName');
const popupAddElementInputLink = document.querySelector('#popupAddElementInputLink')





function closePopupEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
}

function closePopupAddElement() {
  popupAddElement.classList.remove('popup_opened');
}

function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');
  popupEditProfileInputName.value = profileName.textContent;
  popupEditProfileInputDescription.value = profileDescription.textContent;
}

function openPopupAddElement() {
  popupAddElement.classList.add('popup_opened');
}


const templateElement = document.querySelector('.template-element').content;
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


function editProfile(event) {
  event.preventDefault();
  profileName.textContent = popupEditProfileInputName.value;
  profileDescription.textContent = popupEditProfileInputDescription.value;
  closePopupEditProfile();
}
popupEditProfileForm.addEventListener('submit', editProfile);

function createElement(item) {
  const element = templateElement.querySelector('.element').cloneNode(true);
  element.querySelector('.element__pic-caption').textContent = item.name;
  element.querySelector('.element__pic').src = item.link;
  element.querySelector('.element__like-button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
  element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
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

function addElement(event) {
  event.preventDefault();
  const name = popupAddElementInputName.value;
  const link = popupAddElementInputLink.value;
  const item = {
    name: name,
    link: link,
  };
  prependElement(item);
  closePopupAddElement();
}
popupAddElementForm.addEventListener('submit', addElement);


profileEditButton.addEventListener('click', openPopupEditProfile);
elementAddButton.addEventListener('click', openPopupAddElement);

editProfileCloseButton.addEventListener('click', closePopupEditProfile);
addElementCloseButton.addEventListener('click', closePopupAddElement);



