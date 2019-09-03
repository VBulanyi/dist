import {formRegName, formRegJob, isEmptyOrSpaces} from '../../index';

const errorName = document.querySelector('#errorName');
const errorJob = document.querySelector('#errorJob');

function regFormNameValidation () {

    // if (formRegName.validity.valid) {

    //     errorName.textContent = "";

    // } else if (formRegName.validity.valueMissing) {

    //     errorName.textContent = "Это обязательное поле";

    // } else(errorName.textContent = "Должно быть от 2 до 30 символов");

    if (formRegName.validity.valid && !isEmptyOrSpaces(formRegName.value)) {

        errorName.textContent = "";


    } else if (formRegName.validity.valueMissing || isEmptyOrSpaces(formRegName.value)) {

        errorName.textContent = "Это обязательное поле";

    } else(errorName.textContent = "Должно быть от 2 до 30 символов");

}

function regFormJobValidation () {

    if (formRegJob.validity.valid && !isEmptyOrSpaces(formRegJob.value)) {

        errorJob.textContent = "";

    } else if (formRegJob.validity.valueMissing || isEmptyOrSpaces(formRegJob.value)) {

        errorJob.textContent = "Это обязательное поле";

    } else(errorJob.textContent = "Должно быть от 2 до 30 символов");
}

export {regFormNameValidation, regFormJobValidation};
