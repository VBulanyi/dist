import {isValidUrl} from '../../index';
const inputAvatarUrl = document.querySelector('#inputAvatarUrl');
const errorAvatarUrl = document.querySelector('#errorAvatarUrl');

function clearField() {
    errorAvatarUrl.textContent = ""
};

function mandoratyField() {
    errorAvatarUrl.textContent = "Это обязательное поле"
};

function urlNeeded() {
    errorAvatarUrl.textContent = "Здесь должна быть ссылка"
};

export default function avatarFormValidation() {

    if (inputAvatarUrl.validity.valid && isValidUrl(inputAvatarUrl.value)) {

        clearField();

    } else if (inputAvatarUrl.validity.valueMissing) {

        mandoratyField();

    } else(urlNeeded());
}