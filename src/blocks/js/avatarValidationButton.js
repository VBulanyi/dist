import {formAvatar, isEmptyOrSpaces} from '../../index';
import {avatarButtonDisable, avatarButtonEnable}  from './popUpForm';

export default function avatarValidationButton () {

    if (!formAvatar.checkValidity() || isEmptyOrSpaces(inputAvatarUrl.value)) {

        avatarButtonDisable();

    } else {

        avatarButtonEnable();

    }
}