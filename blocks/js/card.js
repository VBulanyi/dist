const token = '1df75db8-4542-4ec7-8523-5faf7d07ce84';
const urlLike = 'http://95.216.175.5/cohort1/cards/like/';
const urlCards = 'http://95.216.175.5/cohort1/cards/';

import Api from './api.js';

const apia = new Api(token);

export default class Card {

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
