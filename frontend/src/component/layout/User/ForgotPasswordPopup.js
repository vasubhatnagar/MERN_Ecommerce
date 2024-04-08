import { Fragment, useEffect, useRef, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditPopup,
  closeForgotPwdPopup,
} from "../../../actions/popupActions";
import {
  fogotPassword,
  loadUser,
  profileUpdate,
} from "../../../actions/userActions";
import { useAlert } from "react-alert";
const ForgotPasswordPopup = () => {
  const ForgetPasswordForm = useRef();
  const { ForgotPwdPopup } = useSelector((state) => state.popup);
  const { isEmailSent } = useSelector((state) => state.profile);
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const closePopup = () => {
    dispatch(closeForgotPwdPopup());
  };

  const handleResetLink = (e) => {
    e.preventDefault();
    const MyForm = new FormData();
    MyForm.set("email", email);
    dispatch(fogotPassword(MyForm));
    closePopup();
    alert.success("Email Sent Successfully!!");
  };
  useEffect(() => {
    if (ForgotPwdPopup) {
      ForgetPasswordForm.current.style.display = "block";
    } else {
      ForgetPasswordForm.current.style.display = "none";
    }
  }, [ForgotPwdPopup]);
  return (
    <Fragment>
      <div
        ref={ForgetPasswordForm}
        className="fixed hidden min-w-[100vw] min-h-[100vh] top-0 left-0 backdrop-blur-sm z-20"
      >
        <div className=" py-24 shadow-2xl border-2 border-black absolute text-black bg-white font-mono rounded-xl p-5 top-1/4 left-1/2 ml-[-175px] min-w-[350px] text-center">
          <p className="font-bold">Reset You Password Here!!</p>
          <FaRegWindowClose
            className="absolute top-3 right-3"
            size={22}
            onClick={closePopup}
          />
          <form onSubmit={handleResetLink}>
            <div className="flex mt-3 justify-evenly">
              <p>E-Mail : </p>
              <input
                className="ml-2 truncate border-2 border-black rounded-3xl px-2"
                type="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <input
              value={"Request Reset Link"}
              type="submit"
              className=" mt-5 px-3 py-1 bg-blue-900 text-white font-semibold font-mono rounded-3xl hover:bg-orange-600 hover:px-4"
            ></input>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPasswordPopup;
