import { CHANGEPWD_POPUP_CLOSE, CHANGEPWD_POPUP_OPEN, EDIT_POPUP_CLOSE, EDIT_POPUP_OPEN, FORGOT_PWD_POPUP_CLOSE, FORGOT_PWD_POPUP_OPEN } from "../constants/popupConstants";

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

export const openChangePwdPopup = () => (dispatch) => {
  try {
    dispatch({ type: CHANGEPWD_POPUP_OPEN});
  } catch (error) {
    dispatch({ type: CHANGEPWD_POPUP_CLOSE });
  }
};

export const closeChangePwdPopup = () => (dispatch) => {
  try {
    dispatch({ type: CHANGEPWD_POPUP_CLOSE });
  } catch (error) {
    dispatch({ type: CHANGEPWD_POPUP_CLOSE });
  }
};

export const openForgotPwdPopup = () => (dispatch) => {
  try {
    dispatch({ type: FORGOT_PWD_POPUP_OPEN});
  } catch (error) {
    dispatch({ type: FORGOT_PWD_POPUP_CLOSE });
  }
};

export const closeForgotPwdPopup = () => (dispatch) => {
  try {
    dispatch({ type: FORGOT_PWD_POPUP_CLOSE });
  } catch (error) {
    dispatch({ type: FORGOT_PWD_POPUP_CLOSE });
  }
};
