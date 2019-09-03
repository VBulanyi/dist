import {formReg, isEmptyOrSpaces} from '../../index';
import {regButtonDisable, regButtonEnable}  from './popUpForm';

export default function regValidationButton () {

    if (!formReg.checkValidity() || isEmptyOrSpaces(formRegName.value) || isEmptyOrSpaces(formRegJob.value)) {

        regButtonDisable();

    } else {

        regButtonEnable();

    }
}