import {isValidUrl} from '../../index';
const inputAvatarUrl = document.querySelector('#inputAvatarUrl');
const errorAvatarUrl = document.querySelector('#errorAvatarUrl');

export default function avatarFormValidation () {

    if (inputAvatarUrl.validity.valid && isValidUrl(inputAvatarUrl.value)) {

        errorAvatarUrl.textContent = "";

    } else if (inputAvatarUrl.validity.valueMissing) {

        errorAvatarUrl.textContent = "Это обязательное поле";

    } else(errorAvatarUrl.textContent = "Здесь должна быть ссылка");
}