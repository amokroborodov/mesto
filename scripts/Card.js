import { showPopup, handleOverlay } from "./popups.js";

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _createElement() {
    const element = this._getTemplate();
    element.querySelector('.element__pic-caption').textContent = this._name;
    const picture = element.querySelector('.element__pic');
    picture.src = this._link;
    picture.alt = this._name;
    return element;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.cloneNode(true);
  }

  _showPicturePopupHandler = () => {
    const popupForPicture = document.querySelector('#popupPicture');
    const popupPicture = document.querySelector('.popup__picture');
    const popupPicCapture = document.querySelector('.popup__picCapture');
    popupPicture.src = this._link;
    popupPicture.alt = this._name;
    popupPicCapture.textContent = this._name;
    showPopup(popupForPicture);
  }

  _setEventListeners(element) {
    element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like-button_active');
    });
    element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove();
    });
    element.querySelector('.element__pic').addEventListener('click',  this._showPicturePopupHandler);
  }

  buildElement() {
    const element = this._createElement();
    this._setEventListeners(element);

    return element;
  }
}
