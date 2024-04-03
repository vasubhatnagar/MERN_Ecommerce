import { EDIT_POPUP_CLOSE, EDIT_POPUP_OPEN } from "../constants/popupConstants";

export const openEditPopup = () => (dispatch) => {
  try {
    dispatch({ type: EDIT_POPUP_OPEN });
  } catch (error) {
    dispatch({ type: EDIT_POPUP_CLOSE });
  }
};

export const closeEditPopup = () => (dispatch) => {
  try {
    dispatch({ type: EDIT_POPUP_CLOSE });
  } catch (error) {
    dispatch({ type: EDIT_POPUP_CLOSE });
  }
};
