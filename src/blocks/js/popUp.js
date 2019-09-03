const popuppPicture = document.querySelector('.insert-fragment');

export default class Popup {

       constructor(element) {

        this.element = element;
    }

    open() {

        this.element.addEventListener('click', function (e) {

            if (e.target.classList.contains('place-card__image')) {
                // HTML шаблон перемешан JS, плохая практика. Так делать нельзя 
                const getPopupImageLink = e.target.attributes.style.value.slice(22, -1);
                // лучше получать его отдельным методом
                return popuppPicture.insertAdjacentHTML('afterbegin', `<div class="popup popup_is-opened popup-picture">
                <div class="popup__content place-card__popup" style="background-image: url(${getPopupImageLink})">
                <img src="src/images/close.svg" alt="" class="popup__close">
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