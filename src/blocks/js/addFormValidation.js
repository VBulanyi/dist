import {formAddName, formAddUrl, isEmptyOrSpaces, isValidUrl} from '../../index';

const errorAddName = document.querySelector('#errorAddName');
const errorAddUrl = document.querySelector('#errorAddUrl');

function addFormNameValidation () {

    if (formAddName.validity.valid && !isEmptyOrSpaces(formAddName.value)) {

        errorAddName.textContent = "";

    } else if (formAddName.validity.valueMissing || isEmptyOrSpaces(formAddName.value)) {

        errorAddName.textContent = "Это обязательное поле";

    } else(errorAddName.textContent = "Должно быть от 2 до 30 символов");
}

function addFormUrlValidation () {

    if (formAddUrl.validity.valid && isValidUrl(formAddUrl.value)) {

        errorAddUrl.textContent = "";

    } else if (formAddUrl.validity.valueMissing) {

        errorAddUrl.textContent = "Это обязательное поле";

    } else(errorAddUrl.textContent = "Здесь должна быть ссылка");
}

export {addFormNameValidation, addFormUrlValidation};