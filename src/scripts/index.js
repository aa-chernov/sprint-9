import Api from './Api';
import Card from './Card';
import CardList from './CardList';
import FormValidator from './FormValidator';
import ImagePopup from './ImagePopup';
import Popup from './Popup';
import UserInfo from './UserInfo';
import '../pages/index.css';

/* Переменные */

const placesList = document.querySelector('#places-list');
const cardEditButton = document.querySelector('#add-button');
const placePopup = document.querySelector('#card-popup');
const addButton = placePopup.querySelector('#submit');
const cardForm = document.querySelector('#new');

const userEditButton = document.querySelector('#edit');
const userPopup = document.querySelector('#user-popup');
const defaultName = document.querySelector('#username');
const defaultAbout = document.querySelector('#userbio');
const defaultAvatar = document.querySelector('#user-avatar');
const defaultData = {
  name: defaultName,
  about: defaultAbout,
  avatar: defaultAvatar
}

const imagePopup = document.querySelector('#image-popup');
const fullImage = document.querySelector('#image-popup-content');

const userForm = document.querySelector('#user-form');
const userData = {
  name: userForm.elements.name,
  about: userForm.elements.about
};

//_______________________________________________________________________________________________

const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort10',
  headers: {
    authorization: '566996ff-1731-4610-9107-800b41b9de7e',
    'Content-Type': 'application/json'
  }
}
);

const newCard = (obj) => {
  const card = new Card();
  return card.create(obj);
}

const cardList = new CardList(placesList, newCard, api, placePopup);

const userInstance = new UserInfo(userData, defaultData, api, userPopup);

const cardPopup = new Popup (placePopup, cardEditButton);
const editPopup = new Popup (userPopup, userEditButton);
const imageOpenUp = new ImagePopup (imagePopup);

const cardValidator = new FormValidator(cardForm);
const userValidator = new FormValidator(userForm);

/* Слушатели */

placesList.addEventListener('click', function (event) {
  imageOpenUp.openImage(event.target);
});

cardEditButton.addEventListener('click', function () {
  cardValidator.resetForm();
});

userEditButton.addEventListener('click', function () {
  userValidator.resetForm();
  userInstance.setUserInfo();
  userValidator.setSubmitButtonState(this.form);
});

cardForm.addEventListener('input', function (event) {
  cardValidator.setSubmitButtonState(cardValidator.checkInputValidity(event.target));
});
userForm.addEventListener('input', function (event) {
  userValidator.setSubmitButtonState(userValidator.checkInputValidity(event.target));
});

cardForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = cardForm.elements.name.value;
    const link = cardForm.elements.link.value;
    const cardData = {
      name: name,
      link: link
    };
    cardList.unloadCard(cardData);
    cardForm.reset();
});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
    cardPopup.close();
    editPopup.close();
    imageOpenUp.closeImage();
  }
});

userForm.addEventListener('submit', function() {
  event.preventDefault();
  userInstance.setUserData();
});

//_______________________________________________________________________________________________

userInstance.getUserData();
cardList.getInitialCards();

//_______________________________________________________________________________________________

export {cardList, fullImage, addButton, userInstance};
