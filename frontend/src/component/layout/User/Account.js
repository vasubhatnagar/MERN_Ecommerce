import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditProfilePopup from "./EditProfilePopup";
import { openEditPopup } from "../../../actions/popupActions";
const Account = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const openEdit = () => {
    dispath(openEditPopup());
  };
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <Fragment>
      {isAuthenticated && (
        <Fragment>
          <div className="bg-white text-center">
            <EditProfilePopup />
            <div className="p-2 sm:p-12 text-blackfont-extrabold  bg-slate-300 rounded-md m-7 shadow-2xl">
              <div className="p-5">
                <img
                  className=" h-[250px] w-[250px] rounded-full mx-auto shadow-2xl"
                  src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA5L3JtMzYzLWIwOC1tb2NrdXAtam9iMTAwMy1sOGVobWoyZy5qcGc.jpg"
                  alt="img"
                />
              </div>
              <p className="font-bold font-mono text-lg ">User Profile</p>
              <p className=" font-mono">Name : {user.name}</p>
              <p className=" font-mono">Email : {user.email}</p>
              <p className=" font-mono">
                Joined On : {user.createdAt.substring(0, 10)}
              </p>
              <div className="sm:flex justify-center mt-4">
                <button
                  onClick={openEdit}
                  className="bg-sky-950 m-1  text-white font-semibold px-3 py-2 rounded-2xl ml-5"
                >
                  Edit Profile
                </button>
                <button className="bg-sky-950 m-1 text-white font-semibold px-3 py-2 rounded-2xl ml-5">
                  My Orders
                </button>
                <button className="bg-sky-950 m-1 text-white font-semibold px-3 py-2 rounded-2xl ml-5">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Account;
