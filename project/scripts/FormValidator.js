'use strict';

class FormValidator {
  constructor(form) {
    this.form = form;
    this.submit = submit;
    this.checkInputValidity = this.checkInputValidity.bind(this);
  }

  checkInputValidity(inputElement) {
    const validationErrors = {
      valueError: 'Это обязательное поле',
      lengthError: 'Должно быть от 2 до 30 символов',
      linkError: 'Здесь должна быть ссылка'
    };

    if (inputElement.validity.valueMissing) {
      inputElement.nextElementSibling.textContent = validationErrors.valueError;
      return false;
    }
    if ((inputElement.validity.tooShort || inputElement.validity.tooLong) && (inputElement.type === 'text')) {
      inputElement.nextElementSibling.textContent = validationErrors.lengthError;
      return false;
    }

    if ((!inputElement.validity.valid) && (inputElement.type === 'url')) {
      inputElement.nextElementSibling.textContent =validationErrors.linkError;
      return false;
    }

    else {
      inputElement.nextElementSibling.textContent = '';
      return true;
    };
  }

  setSubmitButtonState() {
    const formInputs = Array.from(this.form.elements);
    let isValidForm = true;

    formInputs.forEach((item) => {
      if (item.id !== 'submit') {
        if (!this.checkInputValidity(item)) {
          isValidForm = false;}
      }
    });

    if (isValidForm === true) {
      this.form.submit.classList.remove("button__disable");
      this.form.submit.removeAttribute("disabled");
    }

    else {
      this.form.submit.classList.add("button__disable");
      this.form.submit.setAttribute("disabled", true);
    }
  }

  resetForm () {
    const formInputs = Array.from(this.form.elements);

    formInputs.forEach((item) => {
      if (item.id !== 'submit') {
        item.value = '';
        item.nextElementSibling.textContent = '';
      }
    });
  }
}



