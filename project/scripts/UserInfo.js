'use strict';

class UserInfo {
  constructor(userData, defaultData, api, userPopup) {
    this.api = api;
    this.userName = userData.name;
    this.userAbout = userData.about;
    this.defaultName = defaultData.name;
    this.defaultAbout = defaultData.about;
    this.defaultAvatar = defaultData.avatar;
    this.userPopup = userPopup;
    this.setUserInfo();
  }

  setUserInfo() {
    this.userName.value = this.defaultName.textContent;
    this.userAbout.value = this.defaultAbout.textContent;
  }

  updateUserInfo(obj) {
    this.defaultName.textContent = obj.name;
    this.defaultAbout.textContent = obj.about;
  }

  unloadUserInfo(data) {
    this.defaultName.textContent = data.name;
    this.defaultAbout.textContent = data.about;
    this.defaultAvatar.src = data.avatar;
  }

  getUserData() {
    this.api.getUserData()
      .then((res) => {
        userInstance.unloadUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserData() {
    this.api.sendUserData(this.userName.value, this.userAbout.value) 
      .then((res) => {
        userInstance.updateUserInfo(res);
        this.userPopup.classList.remove('popup_is-opened');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

