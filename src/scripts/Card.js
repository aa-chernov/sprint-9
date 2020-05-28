export default class Card {
  constructor() {
    this.card = document.createElement("div");
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
  }

  create(obj) {
    this.card.classList.add("place-card");

    this.card.insertAdjacentHTML(
      "beforeend",
      `<div id="card-img" class="place-card__image" style="background-image: url(${obj.link})" data-url=${obj.link}>
        <button id="trash" class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name">${obj.name}</h3>
        <div class="place-card__like-icon">
        <button id="like" class="place-card__like-icon"></button>
      </div>`
    );

    this.setEvents();
    return this.card;
  }

  like() {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove() {
    this
    .card
    .querySelector('.place-card__like-icon')
    .removeEventListener('click', this.like);

    this
    .card
    .querySelector('.place-card__delete-icon')
    .removeEventListener('click', this.remove);

    this.card.remove();

  }

  setEvents() {
    this
    .card
    .querySelector('.place-card__like-icon')
    .addEventListener('click', this.like);

    this
    .card
    .querySelector('.place-card__delete-icon')
    .addEventListener('click', this.remove);
  }
}