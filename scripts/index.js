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

initialElements.forEach(appendElement);
