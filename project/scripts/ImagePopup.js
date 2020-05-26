'use strict';

class ImagePopup {
  constructor(popup) {
    this.popup = popup;
    this.openImage = this.openImage.bind(this);
    this.closeImage = this.closeImage.bind(this);
    this.setEvents();
  }

  openImage(element) {
    if (element.classList.contains('place-card__image')) {
      this.popup.classList.add('image-popup_is-opened');
      fullImage.setAttribute('src', element.dataset.url);
    }
  }

  closeImage() {
    this.popup.classList.remove('image-popup_is-opened');
  }

  setEvents() {
    this
    .popup
    .querySelector('.image-popup__close')
    .addEventListener('click', this.closeImage);
  }
}