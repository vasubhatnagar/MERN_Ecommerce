import { SiMongodb } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaNode } from "react-icons/fa6";
import {
  TbCircleLetterM,
  TbCircleLetterE,
  TbCircleLetterR,
  TbCircleLetterN,
} from "react-icons/tb";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <div>
      <div className="md:flex justify-evenly bg-black p-7 font-mono">
        <div className="w-1/4 justify-center px-3 text-center">
          <div className="text-white font-bold p-4 flex ">
            <div className="px-3 mongo">
              <div>
                <TbCircleLetterM size={30} />
              </div>
              <div>
                <SiMongodb size={30} />
              </div>
            </div>
            <div className="px-3 express">
              <div>
                <TbCircleLetterE size={30} />
              </div>
              <div>
                <SiExpress size={30} />
              </div>
            </div>
            <div className="px-3 react">
              <div>
                <TbCircleLetterR size={30} />
              </div>
              <div>
                <FaReact size={30} />
              </div>
            </div>
            <div className="px-3 node">
              <div>
                <TbCircleLetterN size={30} />
              </div>
              <div>
                <FaNode size={30} />
              </div>
            </div>
          </div>
          <p className="text-white font-serif"> Vasu Bhatnagar</p>
          <p className="text-white"> Copyrights Reserved</p>
        </div>
        <div className="border-e-2"></div>
        <div className="text-white p-4 text-center w-1/4">
          <h2 className="border-2 mb-3 font-extrabold">Shipping</h2>
          <p>
            There are 2 types of shipping. Expedite and standard. For Expetide
            you have to pay Rs.200/- extra.
          </p>
        </div>
        <div className="border-e-2 "></div>
        <div className="text-white p-4 text-center w-1/4">
          <h2 className="border-2 mb-3 font-extrabold">Payments</h2>
          <p>
            Only Card Payments are accepted on this website. If you wish to pay
            via UPI, kindly send it on 9717XXXX68
          </p>
        </div>
        <div className="border-e-2 "></div>
        <div className="text-white font-bold p-4 text-center w-1/4">
          <h2 className="border-2 mb-3 font-extrabold">Connect with us</h2>
          <div className="flex justify-evenly py-5">
            <div className="text-blue-900">
              <BsLinkedin size={40} />
            </div>
            <div className="text-orange-500">
              <SiGmail size={40} />
            </div>

            <div>
              <BsGithub size={40} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
<div></div>;

export default Footer;
