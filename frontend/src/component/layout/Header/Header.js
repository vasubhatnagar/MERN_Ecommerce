import React, { useEffect } from "react";
import "./Header.css";
import WebFont from "webfontloader";
import {
  MdHome,
  MdOutlineContactMail,
  MdShoppingCart,
  MdOutlineEmail,
  MdLogin,
  MdPhoneCallback,
} from "react-icons/md";
import {
  TbCircleLetterM,
  TbCircleLetterE,
  TbCircleLetterR,
  TbCircleLetterN,
} from "react-icons/tb";

const Header = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Roboto"],
      },
    });
  }, []);

  return (
    <div className="flex justify-between bg-black py-3 px-5 font-mono">
      <div className="flex items-center">
        <h1 className="text-red-100">
          <TbCircleLetterM size={40} />
        </h1>
        <h3 className="text-red-200">
          <TbCircleLetterE size={40} />
        </h3>
        <h3 className="text-red-300">
          <TbCircleLetterR size={40} />
        </h3>
        <h3 className="text-red-400">
          <TbCircleLetterN size={40} />
        </h3>
      </div>
      <div className="flex justify-between align-middle">
        <div className="flex-col items-center px-5">
          <h3 className="text-red-100 twc">
            <MdHome />
          </h3>
          <h4 className="text-red-100 font-extrabold">Home</h4>
        </div>
        <div className="flex-col  items-center px-5">
          <h3 className="text-red-300 twc">
            <MdOutlineContactMail />
          </h3>
          <h4 className="text-red-300 font-extrabold">About Us</h4>
        </div>
        <div className="flex-col  items-center px-5">
          <h3 className="text-red-400 twc">
            <MdShoppingCart />
          </h3>
          <h4 className="text-red-400 font-extrabold">Cart</h4>
        </div>
        <div className="flex-col  items-center px-5">
          <h3 className="text-red-300 twc">
            <MdOutlineEmail />
          </h3>
          <h4 className="text-red-300 font-extrabold">Messages</h4>
        </div>
        <div className="flex-col  items-center px-5">
          <h3 className="text-red-100 twc">
            <MdPhoneCallback />
          </h3>
          <h4 className="text-red-100 font-extrabold">Request Callback</h4>
        </div>
      </div>
      <div className="flex-col items-center p-1 rounded-2xl bg-red-800">
        <h3 className="text-white px-3 twc">
          <MdLogin />
        </h3>
        <h4 className="text-white px-3">Login</h4>
      </div>
    </div>
  );
};

export default Header;
