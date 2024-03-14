import React, { useEffect } from "react";
import './Header.css'
import WebFont from "webfontloader";
const Header = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Roboto"],
      },
    });
  }, []);

  return (
    <div className="headerParent">
        <h5>logo</h5>
       <h5>Links</h5>
       <h5>Links</h5>
       <h5>Links</h5>
       <h5>Links</h5>
       <h5>Links</h5>
        <h5>login/signup</h5>
    </div>
  );
};

export default Header;
