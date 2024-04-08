import {
  EDIT_POPUP_OPEN,
  EDIT_POPUP_CLOSE,
  CHANGEPWD_POPUP_OPEN,
  CHANGEPWD_POPUP_CLOSE,
  FORGOT_PWD_POPUP_OPEN,
  FORGOT_PWD_POPUP_CLOSE,
} from "../constants/popupConstants.js";
export const popupReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_POPUP_OPEN:
      return {
        ...state,
        editPopup: true,
      };

    case EDIT_POPUP_CLOSE:
      return {
        ...state,
        editPopup: false,
      };
    case CHANGEPWD_POPUP_OPEN:
      return {
        ...state,
        changePwdPopup: true,
      };

    case CHANGEPWD_POPUP_CLOSE:
      return {
        ...state,
        changePwdPopup: false,
      };

      case FORGOT_PWD_POPUP_OPEN:
        return {
          ...state,
          ForgotPwdPopup: true,
        };
  
      case FORGOT_PWD_POPUP_CLOSE:
        return {
          ...state,
          ForgotPwdPopup: false,
        };
    default:
      return state;
  }
};
