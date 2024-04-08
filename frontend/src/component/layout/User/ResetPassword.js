import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, resetPassword } from "../../../actions/userActions";
import { useAlert } from "react-alert";
const ResetPassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {error, success} = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const ResetPasswordHandler = (e) => {
    e.preventDefault();
    console.log("reset clicked");
    const MyForm = new FormData();
    MyForm.set("password", password);
    MyForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(resetToken, MyForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success) {
        dispatch(loadUser());
      alert.success("Password Reset Successfull!");
      navigate('/account');
    }
  }, [error, success]);
  return (
    <Fragment>
      <div className="w-[350px] mx-auto py-10 bg-slate-400 text-center">
        <form onSubmit={ResetPasswordHandler}>
          <div className="flex justify-around mt-3">
            <p>Current Password : </p>
            <input
              className="truncate  rounded-3xl px-2"
              type="password"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-around mt-3">
            <p>New Password : </p>
            <input
              className="truncate  rounded-3xl px-2"
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <input
            value={"Update Password"}
            type="submit"
            className=" mt-5 mx-auto px-3 py-1 bg-cyan-900 text-white font-bold font-mono rounded-3xl"
          ></input>
        </form>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
