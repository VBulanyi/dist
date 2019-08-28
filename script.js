const popUpIsOpend = document.querySelector('.popupAdd');
const deleteBtn = document.querySelector('.place-card__delete-icon');
const places = document.querySelector('.places-list');
const popUpIsOpendEdit = document.querySelector('.popupEdit');
const popUpIsOpendAvatar = document.querySelector('.popupAvatar');
const addCloseButton = document.querySelector('#formAddClose');
const regCloseButton = document.querySelector('#formRegClose');
const formAvatarClose = document.querySelector('#formAvatarClose');
const formAdd = document.forms.new;
const formReg = document.forms.profile;
const formAvatar = document.forms.avatar;
const popup = document.querySelector('.popup');
const root = document.querySelector('.root');
const buttonAdd = popUpIsOpend.querySelector('.popup__button');
const buttonEdit = popUpIsOpendEdit.querySelector('.popup__button');
const buttonAvatar = popUpIsOpendAvatar.querySelector('.popup__button');
const popuppPicture = document.querySelector('.insert-fragment');
const popupForm = document.querySelector('.popup-form');
const temp = document.createElement('div');
const errorName = document.querySelector('#errorName');
const errorJob = document.querySelector('#errorJob');
const formRegName = document.querySelector('#formRegName');
const formRegJob = document.querySelector('#formRegJob');
const formAddName = document.querySelector('#formAddName');
const formAddUrl = document.querySelector('#formAddUrl');
const inputAvatarUrl = document.querySelector('#inputAvatarUrl');
const errorAddName = document.querySelector('#errorAddName');
// const likeCount = document.querySelector('.place-card__like-count');
const errorAddUrl = document.querySelector('#errorAddUrl');
const errorAvatarUrl = document.querySelector('#errorAvatarUrl');
const urlUserInfo = 'http://95.216.175.5/cohort1/users/me';
const urlCards = 'http://95.216.175.5/cohort1/cards/';
const urlAvatar = 'http://95.216.175.5/cohort1/users/me/avatar';
const urlLike = 'http://95.216.175.5/cohort1/cards/like/';
const token = '1df75db8-4542-4ec7-8523-5faf7d07ce84';
const ownerId = '3e0f80c006cd28253082ed7d';



class Card {

    constructor(name, link, id, likeCount) {

        this.name = name;

        this.link = link;

        this.id = id;

        this.likeCount = likeCount;

    }

    like(element) {


        this.element = element;

        this.element.addEventListener('click', function (e) {

            const id = e.target.closest('.place-card').id;

            const tag = e.target.classList;

            if (tag.contains('place-card__like-icon_liked')) {
                api.dislike(urlLike, id, tag);
            }
            else if (tag.contains('place-card__like-icon') && !tag.contains('place-card__like-icon_liked') ) {
                api.like(urlLike, id, tag);
            }
        });

    }
    remove(element) {
        
        element.addEventListener('click', function (e) {

            /* Надо исправить:
             * Экземпляр класса Api можно создать один раз при инициализации скрипта, в дальнейшем точечно обращаяся к необходимым методам.
             * */

            //Исправлено

            if (e.target.classList.contains('place-card__delete-icon')) {

                api.deleteCardFromServer(urlCards, e.target.closest('.place-card').id, element, e)

            }

        });
    }

    create() {

        return `
        <div class="place-card" id="${this.id}">
            <div class="place-card__image" style="background-image: url(${this.link})">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name">${this.name}</h3>
                <div class="place-card__like-container">
                    <span class="place-card__like-count">${this.likeCount}</span>           
                    <button class="place-card__like-icon"></button>
                </div>
            </div>
        </div>`;
    }

}


class CardList {

    constructor(places) {

        this.places = places;

    }

    addCard(name, link, id, likeCount) {

        this.name = name;

        this.link = link;

        this.id = id;

        this.likeCount = likeCount;

        let html = '';

        const card = new Card(this.name, this.link, this.id, this.likeCount);

        html = card.create();

        return this.places.insertAdjacentHTML('beforeend', html);

        /* Обратить внимание:
         * Этот пункт относится к категории необязательных.
         *
         * Но не кажется ли вам лишним, что мы создаем новый экземпляр cardList, чтобы отрендерить карточку?
         * */
    }


    render(array) {

        this.array = array;

        let html = '';

        for (let i = 0; i < this.array.length; i++) {

            const card = new Card(this.array[i].name, this.array[i].link, this.array[i]._id, this.array[i].likes.length)

            html += card.create();

        };

        return this.places.insertAdjacentHTML('beforeend', html);

    };

}


class Popup {

    constructor(element) {

        this.element = element;


    }

    open() {

        this.element.addEventListener('click', function (e) {

            if (e.target.classList.contains('place-card__image')) {

                const getPopupImageLink = e.target.attributes.style.value.slice(22, -1);

                return popuppPicture.insertAdjacentHTML('afterbegin', `<div class="popup popup_is-opened popup-picture">
                <div class="popup__content place-card__popup" style="background-image: url(${getPopupImageLink})">
                <img src="./images/close.svg" alt="" class="popup__close">
                </div>
            </div>`);
            }
        });
    }

    close() {

        popuppPicture.addEventListener('click', function (e) {
            if (e.target.classList.contains('popup__close')) {
                let fc = popuppPicture.firstChild;

                while (fc) {
                    popuppPicture.removeChild(fc);
                    fc = popuppPicture.firstChild;
                }

            }
        });

    }

}

class Api {
    constructor(token) {

        this.token = token;

    }
    async getUserDescription(baseUrl) {

        this.baseUrl = baseUrl;

        return fetch(`${this.baseUrl}`, {
                headers: {
                    authorization: `${this.token}`
                }
            })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                document.querySelector('.user-info__name').textContent = result.name;
                document.querySelector('.user-info__job').textContent = result.about;
                document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async updateAvatar(baseUrl, avatar) {

        this.baseUrl = baseUrl;

        this.avatar = avatar;

        return fetch(`${this.baseUrl}`, {
                method: 'PATCH',
                headers: {
                    authorization: `${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    avatar: `${this.avatar}`

                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async like(baseUrl, id, tag) {

        this.baseUrl = baseUrl;

        this.id = id;

        this.tag = tag;

        return fetch(`${this.baseUrl}${this.id}`, {
                method: 'PUT',
                headers: {
                    authorization: `${this.token}`
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {

                this.tag.add('place-card__like-icon_liked')

                return res
            })
            .then((res) =>{

                document.getElementById(res._id).querySelector
                
                ('.place-card__like-count').textContent = res.likes.length

                return res
             })
            .catch((err) => {
                console.log(err)
            });
    }

    async dislike(baseUrl, id, tag) {

        this.baseUrl = baseUrl;

        this.id = id;

        this.tag = tag;

        return fetch(`${this.baseUrl}${this.id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `${this.token}`
                }
            })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                this.tag.remove('place-card__like-icon_liked')
                
                return res
            })

            .then((res) =>{

                document.getElementById(res._id).querySelector
                
                ('.place-card__like-count').textContent = res.likes.length 
                return res
             })
             
            .catch((err) => {
                console.log(err)
            });
    }

    async updeteProfileAtServer(baseUrl, name, job) {

        this.baseUrl = baseUrl;

        this.name = name;

        this.job = job;

        fetch(`${this.baseUrl}`, {
                method: 'PATCH',
                headers: {
                    authorization: `${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${this.name}`,
                    about: `${this.job}`
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return editProfile(`${this.name}`, `${this.job}`);
            })
            .catch((err) => {
                console.log(err);
            });

    }


    async renderFromServer(baseUrl) {

        this.baseUrl = baseUrl;

        return fetch(`${this.baseUrl}`, {
                headers: {
                    authorization: `${this.token}`
                }
            })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })
// Выводит на экран все карточки с сервере
            .then((result) => {

                const render = new CardList(places);

                render.render(result);

                return result;

            })
// Проверяет, был ли поставлен лайк, если да, добавляет класс к картинке лайка
            .then((result) => {

                for (let i = 0; i < result.length; i++) {
                    for (let j = 0; j < result[i].likes.length; j++) {
                        if (result[i].likes[j]._id === ownerId) {
                            document.getElementById(result[i]._id).querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked')
                        }
                    }
                }
                return result;
            })


// удаляет иконку корзины, если карточка была создана друшим пользователем
            .then((result) => {

                for (let i = 0; i < result.length; i++) {
                    if (result[i].owner._id !== ownerId) {
                        document.getElementById(result[i]._id).querySelector('.place-card__delete-icon').style.display = "none";
                    };
                }
            })

            .catch((err) => {
                console.log(err);
            });
    }

    async addCardAtServer(baseUrl, name, link) {

        this.baseUrl = baseUrl;

        this.name = name;

        this.link = link;



        return fetch(`${this.baseUrl}`, {
                method: 'POST',
                headers: {
                    authorization: `${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: `${this.name}`,
                    link: `${this.link}`
                    //Исправлено
                    /* Надо исправить:
                     * this.name
                     * this.link
                     * */
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            })

            .then(res => {

                const cardElement = new CardList(places);

                cardElement.addCard(this.name, this.link, res._id, 0);

            })

            .catch((err) => {
                console.log(err);
            });

    }

    async deleteCardFromServer(baseUrl, id, element, e) {

        this.baseUrl = baseUrl;

        this.id = id;

        this.element = element;

        this.e = e;


        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
            fetch(`${this.baseUrl}${this.id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `${this.token}`
                    }
                })
                .then(res => {
                    if (res.ok) {
                        this.element.removeChild(e.target.closest('.place-card'));
                    }
                })

                .catch((err) => {
                    console.log(err);
                });

        }

    }

}

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


function editProfile(name, job) {


    document.querySelector('.user-info__name').textContent = name;

    document.querySelector('.user-info__job').textContent = job;

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

// document.querySelector('.popup__button').addEventListener('click', function () {

//     popUpIsOpendAvatar.classList.remove('popup_is-opened');

// });


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


/* Резюме по работе:
 * Работа - бомба, супер.
 * Вы выполнили почти всё задания, кроме like и аватара. Очень круто.
 * Что понравилось:
 *   1. Выделили class Api - корректно, круто. (Но не включили в него один из методов - не круто :( - подробнее см. комментарии в коде)
 *   2. В целом, работа с фетчем идет корректно, функционал, заявленный вами - работает
 *   3. Цепочки промисов не содержат недостежимых, ненужных кусков кода
 * В общем, сильная работа.
 *
 * А теперь о том, что нужно поправить:
 *   1. Небольшая путаница с id'шниками, которая в итоге сломала функционал удаления карточки после ее удаления - должна быть решена. (См. комментарии в коде)
 * 
 * ИСПРАВЛЕНО
 * 
 *   2. Очень много обращений к новым экземплярам Api. Надо упростить. В конструкторе идет работа только с токенами, а вызывается класс для этого - 5 раз.
 *   Можно просто объявить Api первым и сразу же сделать его экземпляр в коде. Не совсем красиво, но в противном случае необходимо будет вытаскивать все обращения к Api из методов класса в инициализацию скрипта.
 * 
 * ОСТАВИЛ ПО 1 ОБРАЩЕНИЮ
 * 
 *   3. Работа с DOM отдельной веткой от запросов к серверу. Здесь точно необходимо разобраться, все операции над дом при редактировании кода/удалении карточки/добавлении карточки происходят в цепочке промисов.
 *   Иначе у нас происходит асинхронная анархия в коде.
 *
 * 
 * ПЕРЕНЁС ОПЕРАЦИИ С DOM В PROMISE
 * 
 * 
 * Полезные ресурсы по промисам:
 * https://medium.com/web-standards/%D0%BE%D0%B1%D0%B5%D1%89%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80%D0%BD%D0%BE%D0%B9-%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%B8%D0%BD%D0%BA%D0%B8-b0ed209809ab
 *
 * */