const token = '1df75db8-4542-4ec7-8523-5faf7d07ce84';
const urlLike = 'https://praktikum.tk/cohort1/cards/like/';
const urlCards = 'https://praktikum.tk/cohort1/cards/';

import Api from './api.js';

const apia = new Api(token);
// За что отвечает класс
export default class Card {
    // за что отвечают эти переменные ??
    constructor(name, link, id, likeCount) {

        this.name = name;

        this.link = link;

        this.id = id;

        this.likeCount = likeCount;

    }


    like(element) {

            this.element = element;

        this.element.addEventListener('click', function (e) {
            // в отдельный метод
            const id = e.target.closest('.place-card').id;

            const tag = e.target.classList;

            if (tag.contains('place-card__like-icon_liked')) {
                apia.dislike(urlLike, id, tag);
            }
            else if (tag.contains('place-card__like-icon') && !tag.contains('place-card__like-icon_liked') ) {
                apia.like(urlLike, id, tag);
            }
        });

    }
    remove(element) {
        
        element.addEventListener('click', function (e) {

            //Исправлено

            if (e.target.classList.contains('place-card__delete-icon')) {

                apia.deleteCardFromServer(urlCards, e.target.closest('.place-card').id, element, e)

            }

        });
    }

    create() {
        // В создании находится шаблон, это не правильно.
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
