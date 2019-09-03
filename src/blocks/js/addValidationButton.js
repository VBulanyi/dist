import {formAdd, isEmptyOrSpaces, isValidUrl} from '../../index';
import {addButtonDisable, addButtonEnable}  from './popUpForm';

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