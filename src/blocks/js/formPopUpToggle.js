const popUpIsOpend = document.querySelector('.popupAdd');
const popUpIsOpendEdit = document.querySelector('.popupEdit');
const popUpIsOpendAvatar = document.querySelector('.popupAvatar');

function popUp() {

    popUpIsOpend.classList.toggle('popup_is-opened');
}


function popUpEdit() {

    popUpIsOpendEdit.classList.toggle('popup_is-opened');
}

function popUpAvatar() {

    popUpIsOpendAvatar.classList.toggle('popup_is-opened');
}

export {popUp, popUpEdit, popUpAvatar}