import {cardList} from './index';

export default class CardList {
  constructor(container, instance, api, placePopup) {
    this.container = container;
    this.instance = instance;
    this.api = api;
    this.placePopup = placePopup;
  }

  addCard(obj) {
    const templ = this.instance(obj);
    this.container.appendChild(templ);
  }

  render(array) {
    for (let obj of array) {
      this.addCard(obj);
    }
  }

  unloadCard(obj) {
    this.api.sendNewCard(obj)
      .then((res) => {
        cardList.addCard(res);
        this.placePopup.classList.remove('popup_is-opened');
      })
      .catch((err) => {
        console.log(err);
  });
  }

  getInitialCards() {
    this.api.getInitialCards()
      .then((res) => {
        cardList.render(res);
  })
      .catch((err) => {
        console.log(err);
  });
  }
}