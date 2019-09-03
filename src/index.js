import './pages/style.css';
import Card from './blocks/js/card.js';
import Api from './blocks/js/api.js';
import Popup from './blocks/js/popUp.js';
import {popUpForm, addButtonDisable, regButtonDisable, avatarButtonDisable, popUpIsOpend, popUpIsOpendEdit}  from './blocks/js/popUpForm';
import formClose from './blocks/js/formClose';
import {popUpEdit, popUpAvatar} from './blocks/js/formPopUpToggle';
import avatarFormValidation from './blocks/js/avatarFormValidation';
import avatarValidationButton from './blocks/js/avatarValidationButton';
import {regFormNameValidation, regFormJobValidation} from './blocks/js/regFormValidation';
import regValidationButton from './blocks/js/regValidationButton';
import {addFormNameValidation, addFormUrlValidation} from './blocks/js/addFormValidation';
import {addValidationButton} from './blocks/js/addValidationButton';
const popuppPicture = document.querySelector('.insert-fragment');
const places = document.querySelector('.places-list');
const addCloseButton = document.querySelector('#formAddClose');
const regCloseButton = document.querySelector('#formRegClose');
const formAvatarClose = document.querySelector('#formAvatarClose');
const formAdd = document.forms.new;
const formReg = document.forms.profile;
const formAvatar = document.forms.avatar;
const root = document.querySelector('.root');
const popupForm = document.querySelector('.popup-form');
const formRegName = document.querySelector('#formRegName');
const formRegJob = document.querySelector('#formRegJob');
const formAddName = document.querySelector('#formAddName');
const formAddUrl = document.querySelector('#formAddUrl');
const inputAvatarUrl = document.querySelector('#inputAvatarUrl');
const urlUserInfo = 'https://praktikum.tk/cohort1/users/me';
const urlAvatar = 'https://praktikum.tk/cohort1/users/me/avatar';
const token = '1df75db8-4542-4ec7-8523-5faf7d07ce84';
const urlCards = 'https://praktikum.tk/cohort1/cards/';

export {formAvatar, formReg, formAdd, isValidUrl, isEmptyOrSpaces, formRegName, formRegJob, formAddName, formAddUrl};

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

    popUpAvatar(); 

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


// Закрытие попапа с картинкой


let popuppPic = new Popup(places);

popuppPic.open()

let popuppPicClose = new Popup(popuppPicture)
popuppPicClose.close();

// Открытие формы

root.addEventListener('click', function (e) {

    popUpForm (e)

});


// Закрытие формы редактирования профиля/ Добавления карточек

popupForm.addEventListener('click', function (e) {

   formClose(e);

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


formAdd.addEventListener('input', function () {

    addValidationButton ()
    
});


formReg.addEventListener('submit', function () {

    formReg.reset();

    regButtonDisable();

});

formAdd.addEventListener('submit', function () {

    formAdd.reset();

    addButtonDisable()

});

formAvatar.addEventListener('submit', function () {

    formAvatar.reset();

    avatarButtonDisable()

});

formAvatarClose.addEventListener('click', function () {

    formAvatar.reset();

    avatarButtonDisable();

});

regCloseButton.addEventListener('click', function () {

    formReg.reset();

    regButtonDisable();

});


addCloseButton.addEventListener('click', function () {

    formAdd.reset();

    addButtonDisable();

});

formReg.addEventListener('input', function () {

    regValidationButton ()
    
});


formAvatar.addEventListener('input', function () {


    avatarValidationButton();
});



formRegName.addEventListener('input', function () {

    regFormNameValidation () 
    
});

formRegJob.addEventListener('input', function () {

    regFormJobValidation ()
    
});

formAddName.addEventListener('input', function () {

    addFormNameValidation ()
   
});

formAddUrl.addEventListener('input', function () {

    addFormUrlValidation () 
    
});


inputAvatarUrl.addEventListener('input', function () {

avatarFormValidation();

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


/**
 * 
 * Вы первый студент который правильно использовал гит, создавай различные ветки 
 * Гит очень сильный инструмент в умелых руках. Больше почитать об использовании веток межете здесь https://habr.com/ru/post/106912/
 * 
 * Все функции которые находятся в этом файле должны вынесены в классы и общаться они должны между собой только внутри класса 
 * Надо будет переделать правильно
 * Если класс убас достаточно большой, значит вы делаете что-то не так. Не делайте из файла или класса божественный объект в котором всё
 * https://ru.wikipedia.org/wiki/%D0%91%D0%BE%D0%B6%D0%B5%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9_%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82
 * 
 * README.md должно быть рассписано как запустить проект, пошагово, что из себя представляет проект.
 * Представьте что вы отдедите свой проект своему другу через 5 лет и вы двлжны рассказать что и за чем он, какую несёт цель и так далее
 * 
 * Когда будете переписывать обратите внимание чтобы методы не дублировались а были по смыслу более приближённые и их можно было переиспользовать
 * 
 * Так же комментарии, 7 правил коммитов:
- Отделяйте заголовок от тела пустой строкой
- Ограничивайте заголовок 50 символами
- Пишите заголовок с заглавной буквы
- Не ставьте точку в конце заголовка
- Используйте повелительное наклонение в заголовке
- Переходите на следующую строку в теле на 72 символах
- В теле отвечайте на вопросы что и почему, а не как
 * 
 */