import {formAdd, isEmptyOrSpaces, isValidUrl} from '../../index';
import {addButtonDisable, addButtonEnable}  from './popUpForm';

// Метод проверяет на валидность форму добавления карточки, если форма валидна, кнопка submit становится активной. В противном случак submit остаётся не активной.

function addValidationButton () {

    if (!formAdd.checkValidity() || isEmptyOrSpaces(formAddName.value)) {

        addButtonDisable();
        
    } else if (!isValidUrl(formAddUrl.value)) {

        addButtonDisable();

    } else {

        addButtonEnable();
    }

}

export {addValidationButton}; 