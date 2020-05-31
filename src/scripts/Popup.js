import {addButton} from './index';

export default class Popup {
  constructor(popup, button) {
    this.popup = popup;
    this.button = button;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setEvents();
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    addButton.classList.add('button__disable');
    addButton.setAttribute('disabled', true);
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  setEvents() {
    this
    .popup
    .querySelector('.popup__close')
    .addEventListener('click', this.close);

    this
    .button
    .addEventListener('click', this.open);
  }
}