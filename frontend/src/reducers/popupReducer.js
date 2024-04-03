import {
  EDIT_POPUP_OPEN,
  EDIT_POPUP_CLOSE,
} from "../constants/popupConstants.js";
export const popupReducer = (state = { }, action) => {
  switch (action.type) {
    case EDIT_POPUP_OPEN:
      return {
        editPopup: true,
      };

    case EDIT_POPUP_CLOSE:
      return {
        editPopup: false,
      };
    default:
      return state;
  }
};
