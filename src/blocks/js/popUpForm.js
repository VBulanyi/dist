
import {popUp, popUpEdit, popUpAvatar} from './formPopUpToggle';
const popUpIsOpend = document.querySelector('.popupAdd');
const popUpIsOpendEdit = document.querySelector('.popupEdit');
const popUpIsOpendAvatar = document.querySelector('.popupAvatar');
const buttonAdd = popUpIsOpend.querySelector('.popup__button');
const buttonEdit = popUpIsOpendEdit.querySelector('.popup__button');
const buttonAvatar = popUpIsOpendAvatar.querySelector('.popup__button');


export function popUpForm (e) {

    if (e.target.classList.contains('user-info__button')) {

        popUp();


    } else if (e.target.classList.contains('user-info__edit-button')) {

        popUpEdit();

        formRegName.value = document.querySelector('.user-info__name').textContent;

        formRegJob.value = document.querySelector('.user-info__job').textContent;

        ;
    } else if (e.target.classList.contains('user-info__photo')) {

        popUpAvatar();
    }
}


function addButtonDisable() {

    buttonAdd.setAttribute('disabled', true);

    buttonAdd.classList.remove('popup__button_enebled');
}

function addButtonEnable() {

    buttonAdd.removeAttribute('disabled');

    buttonAdd.classList.add('popup__button_enebled');
}

function regButtonDisable() {

    buttonEdit.setAttribute('disabled', true);

    buttonEdit.classList.remove('popup__button_enebled');
}

function regButtonEnable() {

    buttonEdit.removeAttribute('disabled');

    buttonEdit.classList.add('popup__button_enebled');

}

function avatarButtonDisable() {

    buttonAvatar.setAttribute('disabled', true);

    buttonAvatar.classList.remove('popup__button_enebled');
}

function avatarButtonEnable() {

    buttonAvatar.removeAttribute('disabled');

    buttonAvatar.classList.add('popup__button_enebled');

}

export {addButtonDisable, addButtonEnable, regButtonDisable, regButtonEnable, avatarButtonDisable, avatarButtonEnable, popUpIsOpend, popUpIsOpendEdit, popUpIsOpendAvatar};