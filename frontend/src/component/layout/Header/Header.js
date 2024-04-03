import React, { useEffect } from "react";
import "./Header.css";
import WebFont from "webfontloader";
import {
  MdHome,
  MdShoppingCart,
  MdOutlineEmail,
  MdLogin,
  MdPhoneCallback,
  MdAccountCircle,
} from "react-icons/md";
import {
  TbCircleLetterM,
  TbCircleLetterE,
  TbCircleLetterR,
  TbCircleLetterN,
} from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userActions";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Roboto"],
      },
    });
  }, []);

  const handleLogout = () => {
    console.log("Hi");
    dispatch(logout());
  };

  return (
    <div className=" sm:flex text-center justify-between bg-black py-3 px-5 font-mono">
      
      <div className="justify-center text-white font-bold p-0 flex items-center ">
        <div className="px-3 mongo">
          <div>
            <TbCircleLetterM size={30} />
          </div>
        </div>
        <div className="px-3 express">
          <div>
            <TbCircleLetterE size={30} />
          </div>
        </div>
        <div className="px-3 react">
          <div>
            <TbCircleLetterR size={30} />
          </div>
        </div>
        <div className="px-3 node">
          <div>
            <TbCircleLetterN size={30} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-col items-center px-0 sm:px-5">
          <Link to={"/"}>
            <h3 className="text-white twc">
              <MdHome />
            </h3>
            <h4 className="text-white font-extrabold">Home</h4>
          </Link>
        </div>
        <div className="flex-col  items-center px-0 sm:px-5">
          <Link to={"/products"}>
            <h3 className="text-white twc">
              <GiClothes />
            </h3>
            <h4 className="text-white font-extrabold">Products</h4>
          </Link>
        </div>
        <div className="flex-col  items-center px-0 sm:px-5">
          <Link to={"/cart"}>
            <h3 className="text-white twc">
              <MdShoppingCart />
            </h3>
          </Link>
          <h4 className="text-white font-extrabold">Cart</h4>
        </div>
        <div className="flex-col  items-center px-0 sm:px-5">
          <Link to={"/account"}>
            <h3 className="text-white twc">
              <MdAccountCircle />
            </h3>
            <h4 className="text-white font-extrabold">Profile</h4>
          </Link>
        </div>
      </div>
      <div className="flex-col items-center p-1 rounded-2xl bg-red-800 min-w-[150px]">
        {isAuthenticated && user ? (
          <button className="text-white font-bold" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to={"/login"}>
            <h3 className="text-white px-3 twc">
              <MdLogin />
            </h3>
            <h4 className="text-white px-3">Login</h4>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
