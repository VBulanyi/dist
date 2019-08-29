import CardList from './cardList.js';
const places = document.querySelector('.places-list');
const ownerId = '3e0f80c006cd28253082ed7d';

function editProfile(name, job) {


    document.querySelector('.user-info__name').textContent = name;

    document.querySelector('.user-info__job').textContent = job;

}

export default class Api {
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