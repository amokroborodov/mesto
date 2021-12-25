export function showPopup(popup) {
  popup.classList.remove('animationFadeOut');
  popup.classList.add('popup_opened', 'animationFadeIn');

  window.addEventListener('keydown', popupEscCloseHandler);
}

export function hidePopup(popup) {
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


export function closeHandler(evt) {
  if (evt.target.classList.contains('popup__close-button')) {
    hidePopup(evt.currentTarget);
  }
}

export function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    hidePopup(evt.target);
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

