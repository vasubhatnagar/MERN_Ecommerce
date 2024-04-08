import { Fragment, useEffect, useRef, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeChangePwdPopup, closeEditPopup } from "../../../actions/popupActions";
import { clearError, passwordUpdate } from "../../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../../constants/userConstants";

const ChangePasswordPopup = () => {
  const ChangePassPopup = useRef();
  const { isUpdated } = useSelector((state) => state.profile);
  const { changePwdPopup } = useSelector((state) => state.popup);
  const seeIcon = useRef();
  const hideIcon = useRef();
  const alert = useAlert();
  const [currpass, setCurrpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const dispatch = useDispatch();
  const [togglePwd, setTogglePwd] = useState(false);
  const closePopup = () => {
    dispatch(closeChangePwdPopup());
  };
  const togglePwdVisibility = () => {
    setTogglePwd(!togglePwd);
    if (togglePwd) {
      seeIcon.current.style.display = "none";
      hideIcon.current.style.display = "block";
    } else {
      seeIcon.current.style.display = "block";
      hideIcon.current.style.display = "none";
    }
  };
  const updatePassword = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", currpass);
    myForm.set("newPassword", newpass);
    myForm.set("confirmPassword", confirmPass);
    dispatch(clearError());
    dispatch(passwordUpdate(myForm));
  };
  useEffect(() => {
    if (isUpdated) {
      alert.success("Password Changed Successfully!!");
      setConfirmPass("");
      setNewpass("");
      setCurrpass("");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }

    if(!changePwdPopup){
      ChangePassPopup.current.style.display = "none"
    }else{
      ChangePassPopup.current.style.display = "block"
    }
  }, [isUpdated, alert, changePwdPopup]);
  return (
    <Fragment>
      <div
        ref={ChangePassPopup}
        className="fixed hidden min-w-[100vw] min-h-[100vh] top-0 left-0 backdrop-blur-sm "
      >
        <div className=" py-10 shadow-2xl border-2 border-black absolute text-black bg-white font-mono rounded-xl p-5 top-[10%] left-1/2 ml-[-175px] min-w-[350px]text-center">
          <p ref={seeIcon} className="text-9xl hidden py-4">
            🧐
          </p>
          <p ref={hideIcon} className="text-9xl py-4">
            🙄
          </p>
          <p className="font-bold">Change Your Password Here!!</p>
          <FaRegWindowClose
            className="absolute top-3 right-3"
            size={22}
            onClick={closePopup}
          />
          <button
            onClick={togglePwdVisibility}
            className=" mt-5 px-3 py-1 bg-cyan-900 text-white font-bold font-mono rounded-3xl"
          >
            See Passwords
          </button>
          <form onSubmit={updatePassword}>
            <div className="flex justify-evenly mt-3">
              <p>Current Password : </p>
              <input
                className="ml-2 truncate border-2 border-black rounded-3xl px-2"
                type={togglePwd ? "text" : "password"}
                value={currpass}
                required
                onChange={(e) => {
                  setCurrpass(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-evenly mt-3">
              <p>New Password : </p>
              <input
                className="ml-2 truncate border-2 border-black rounded-3xl px-2"
                type={togglePwd ? "text" : "password"}
                value={newpass}
                required
                onChange={(e) => {
                  setNewpass(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-evenly mt-3">
              <p>Confirm Password : </p>
              <input
                className="ml-2 truncate border-2 border-black rounded-3xl px-2"
                type={togglePwd ? "text" : "password"}
                value={confirmPass}
                required
                onChange={(e) => {
                  setConfirmPass(e.target.value);
                }}
              />
            </div>
            <input
              value={"Update Password"}
              type="submit"
              className=" mt-5 px-3 py-1 bg-cyan-900 text-white font-bold font-mono rounded-3xl"
            ></input>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ChangePasswordPopup;
