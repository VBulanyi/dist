export default function formClose (e) {
    
    if (e.target.classList.contains('popup__close')) {

        e.target.closest('.popup').classList.toggle('popup_is-opened');
    }
}