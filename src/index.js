import './pages/style.css';
import Card from './blocks/js/card.js';
import Popup from './blocks/js/popUp.js';
import Api from './blocks/js/api.js';


const popuppPicture = document.querySelector('.insert-fragment');
const popUpIsOpend = document.querySelector('.popupAdd');
const places = document.querySelector('.places-list');
const popUpIsOpendEdit = document.querySelector('.popupEdit');
const popUpIsOpendAvatar = document.querySelector('.popupAvatar');
const addCloseButton = document.querySelector('#formAddClose');
const regCloseButton = document.querySelector('#formRegClose');
const formAvatarClose = document.querySelector('#formAvatarClose');
const formAdd = document.forms.new;
const formReg = document.forms.profile;
const formAvatar = document.forms.avatar;
// const popup = document.querySelector('.popup');
const root = document.querySelector('.root');
const buttonAdd = popUpIsOpend.querySelector('.popup__button');
const buttonEdit = popUpIsOpendEdit.querySelector('.popup__button');
const buttonAvatar = popUpIsOpendAvatar.querySelector('.popup__button');
const popupForm = document.querySelector('.popup-form');
const errorName = document.querySelector('#errorName');
const errorJob = document.querySelector('#errorJob');
const formRegName = document.querySelector('#formRegName');
const formRegJob = document.querySelector('#formRegJob');
const formAddName = document.querySelector('#formAddName');
const formAddUrl = document.querySelector('#formAddUrl');
const inputAvatarUrl = document.querySelector('#inputAvatarUrl');
const errorAddName = document.querySelector('#errorAddName');
const errorAddUrl = document.querySelector('#errorAddUrl');
const errorAvatarUrl = document.querySelector('#errorAvatarUrl');
const urlUserInfo = 'https://praktikum.tk/cohort1/users/me';
const urlAvatar = 'https://praktikum.tk/cohort1/users/me/avatar';
const token = '1df75db8-4542-4ec7-8523-5faf7d07ce84';
const urlCards = 'https://praktikum.tk/cohort1/cards/';

function popUp() {

    popUpIsOpend.classList.toggle('popup_is-opened');
}


function popUpEdit() {

    popUpIsOpendEdit.classList.toggle('popup_is-opened');
}

function popUpAvatar() {

    popUpIsOpendAvatar.classList.toggle('popup_is-opened');
}


function addCard(e) {

    e.preventDefault();

    let form = document.forms.new;

    api.addCardAtServer(urlCards, form.elements.name.value, form.elements.link.value);

    form.reset();
}


function updateAvatar(e) {

    e.preventDefault();

    let form = document.forms.avatar;

    const avatarLink = form.elements.link.value;

    api.updateAvatar(urlAvatar, avatarLink);

    e.preventDefault();

    popUpAvatar()

    form.reset();

}


function updeteProfile(e) {

    let form = document.forms.profile;

    const name = form.elements.name.value;

    const job = form.elements.job.value;

    api.updeteProfileAtServer(urlUserInfo, name, job);

    e.preventDefault();

    popUpEdit();

    form.reset();
}

function isEmptyOrSpaces(str) {
    return str === null || str.trim().length < 2;
}

function isValidUrl(url) {
    const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
    return objRE.test(url);
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

// Закрытие попапа с картинкой


let popuppPic = new Popup(places);

popuppPic.open()

let popuppPicClose = new Popup(popuppPicture)
popuppPicClose.close();

// Открытие формы

root.addEventListener('click', function (e) {


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
});


// Закрытие формы редактирования профиля/ Добавления карточек

popupForm.addEventListener('click', function (e) {

    if (e.target.classList.contains('popup__close')) {

        e.target.closest('.popup').classList.toggle('popup_is-opened');
    }
});




//  Добавление карточки

formAdd.addEventListener('submit', addCard);

document.querySelector('.popup__button').addEventListener('click', function () {

    popUpIsOpend.classList.remove('popup_is-opened');


});


//  Редактирование профиля

formAvatar.addEventListener('submit', updateAvatar);

formReg.addEventListener('submit', updeteProfile)

document.querySelector('.popup__button').addEventListener('click', function () {

    popUpIsOpendEdit.classList.remove('popup_is-opened');

});


formAdd.addEventListener('input', function (e) {

    if (!formAdd.checkValidity() || isEmptyOrSpaces(formAddName.value)) {

        addButtonDisable();
    } else if (!isValidUrl(formAddUrl.value)) {

        addButtonDisable();

    } else {
        addButtonEnable();
    }

});


formReg.addEventListener('submit', function (e) {

    formReg.reset();

    regButtonDisable();

});

formAdd.addEventListener('submit', function (e) {

    formAdd.reset();

    addButtonDisable()

});

formAvatar.addEventListener('submit', function (e) {

    formAvatar.reset();

    avatarButtonDisable()

});

formAvatarClose.addEventListener('click', function (e) {

    formAvatar.reset();

    avatarButtonDisable();

});

regCloseButton.addEventListener('click', function (e) {

    formReg.reset();

    regButtonDisable();

});


addCloseButton.addEventListener('click', function (e) {

    formAdd.reset();

    addButtonDisable()

});

formReg.addEventListener('input', function (e) {

    if (!formReg.checkValidity() || isEmptyOrSpaces(formRegName.value) || isEmptyOrSpaces(formRegJob.value)) {

        regButtonDisable();

    } else {

        regButtonEnable();

    }
});


formAvatar.addEventListener('input', function (e) {

    if (!formAvatar.checkValidity() || isEmptyOrSpaces(inputAvatarUrl.value)) {

        avatarButtonDisable();

    } else {

        avatarButtonEnable();

    }
});



formRegName.addEventListener('input', function (e) {

    if (formRegName.validity.valid) {

        errorName.textContent = "";

    } else if (formRegName.validity.valueMissing) {

        errorName.textContent = "Это обязательное поле";

    } else(errorName.textContent = "Должно быть от 2 до 30 символов");
});

formRegJob.addEventListener('input', function (e) {

    if (formRegJob.validity.valid && !isEmptyOrSpaces(formRegJob.value)) {

        errorJob.textContent = "";

        e.preventDefault();

    } else if (formRegJob.validity.valueMissing || isEmptyOrSpaces(formRegJob.value)) {

        errorJob.textContent = "Это обязательное поле";

    } else(errorJob.textContent = "Должно быть от 2 до 30 символов");
});


formRegName.addEventListener('input', function (e) {

    if (formRegName.validity.valid && !isEmptyOrSpaces(formRegName.value)) {

        errorName.textContent = "";


    } else if (formRegName.validity.valueMissing || isEmptyOrSpaces(formRegName.value)) {

        errorName.textContent = "Это обязательное поле";

    } else(errorName.textContent = "Должно быть от 2 до 30 символов");
});

formAddName.addEventListener('input', function (e) {

    if (formAddName.validity.valid && !isEmptyOrSpaces(formAddName.value)) {

        errorAddName.textContent = "";

    } else if (formAddName.validity.valueMissing || isEmptyOrSpaces(formAddName.value)) {

        errorAddName.textContent = "Это обязательное поле";

    } else(errorAddName.textContent = "Должно быть от 2 до 30 символов");
});

formAddUrl.addEventListener('input', function (e) {

    if (formAddUrl.validity.valid && isValidUrl(formAddUrl.value)) {

        errorAddUrl.textContent = "";

    } else if (formAddUrl.validity.valueMissing) {

        errorAddUrl.textContent = "Это обязательное поле";

    } else(errorAddUrl.textContent = "Здесь должна быть ссылка");
});


inputAvatarUrl.addEventListener('input', function (e) {

    if (inputAvatarUrl.validity.valid && isValidUrl(inputAvatarUrl.value)) {

        errorAvatarUrl.textContent = "";

    } else if (inputAvatarUrl.validity.valueMissing) {

        errorAvatarUrl.textContent = "Это обязательное поле";

    } else(errorAvatarUrl.textContent = "Здесь должна быть ссылка");
});

// Удаление карточки // Лайк

const modifyContent = new Card();

modifyContent.like(places);

modifyContent.remove(places);

const api = new Api(token);

//Загрузка информации о пользователе с сервера

api.getUserDescription(urlUserInfo);

//Загрузка первоначальных карточек с сервера

api.renderFromServer(urlCards);