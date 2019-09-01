import Card from './card.js';
export default class CardList {

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