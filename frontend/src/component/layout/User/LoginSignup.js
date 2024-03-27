import { useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import { MdContactMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaHashtag } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearError, login , register} from "../../../actions/userActions";
import { useAlert } from "react-alert";
const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const loginToggle = useRef();
  const signupToggle = useRef();
  const [activeTab, setActiveTab] = useState("login");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
  );
  const [avatar, setAvatar] = useState("");
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({});
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const {name, email, password} = user;

  const LoginSubmitted = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const SubmitRegister = (e)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar",avatar);
    dispatch(register(myForm));
  }
  const RegisterDataChange = (e) => {
    e.preventDefault();
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const loginToggleClicked = () => {
    loginToggle.current.style.color = "white";
    loginToggle.current.style.width = "80%";
    signupToggle.current.style.width = "20%";
    signupToggle.current.style.color = "#6C6C6C";
    setActiveTab("login");
  };

  const signupToggleClicked = () => {
    signupToggle.current.style.color = "white";
    loginToggle.current.style.color = "#6C6C6C";
    loginToggle.current.style.width = "20%";
    signupToggle.current.style.width = "80%";
    setActiveTab("signup");
  };
  useEffect(() => {
    loginToggleClicked();

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <div>
      <div className="lock-banner min-h-[100vh] align-middle relative">
        <div className="absolute parentDiv p-5 shadow-2xl text-white sm:w-[50%] rounded-lg backdrop-blur-md w-full glass-card">
          <div className="flex justify-center font-semibold font-mono py-5">
            <button
              onClick={loginToggleClicked}
              className="mr-1 bg-black rounded-xl w-[50%] px-2 py-1"
              ref={loginToggle}
            >
              Login
            </button>
            <button
              onClick={signupToggleClicked}
              className="bg-black ml-1 px-2 py-1 w-[50%] rounded-xl"
              ref={signupToggle}
            >
              Signup
            </button>
          </div>
          <div className="align-middle text-center">
            {activeTab === "login" && (
              <form onSubmit={LoginSubmitted}>
                <div className="px-3 username py-1 flex justify-center align-middle items-center">
                  <MdContactMail size={32} className="w-[20%]" />
                  <input
                    type="email"
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                    }}
                    value={loginEmail}
                    required
                    className="w-[80%] font-mono text-white bg-transparent border-2 border-white rounded-md px-3"
                  />
                </div>

                <div className="px-3  mt-4 py-1 password flex justify-center align-middle items-center">
                  <RiLockPasswordFill size={32} className="w-[20%] mr-1" />
                  <input
                    type="password"
                    required
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                    value={loginPassword}
                    className="w-[80%] font-mono bg-transparent text-white border-2 border-white rounded-md px-3"
                  />
                </div>
                <div className="">
                  <Link className="text-right text-white italic font-bold underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="">
                  <input
                    type="submit"
                    value="Login"
                    className="bg-black mt-4 px-2 py-1 w-[30%] rounded-xl font-bold cursor-pointer"
                  ></input>
                </div>
              </form>
            )}

            {activeTab === "signup" && (
              <form onSubmit={SubmitRegister} encType="multipart/form-data">
                <div className="px-3 name py-1 flex justify-center align-middle items-center">
                  <FaHashtag size={32} className="w-[20%]" />
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={RegisterDataChange}
                    className="w-[80%] font-mono text-white bg-transparent border-2 border-white rounded-md px-3"
                  />
                </div>
                <div className="px-3 username py-1 mt-4 flex justify-center align-middle items-center">
                  <MdContactMail size={32} className="w-[20%]" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="E-Mail"
                    onChange={RegisterDataChange}
                    className="w-[80%] font-mono text-white bg-transparent border-2 border-white rounded-md px-3"
                  />
                </div>

                <div className="px-3  mt-4 py-1 password flex justify-center align-middle items-center">
                  <RiLockPasswordFill size={32} className="w-[20%] mr-1" />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={RegisterDataChange}
                    required
                    className="w-[80%] font-mono bg-transparent text-white border-2 border-white rounded-md px-3"
                  />
                </div>

                {/* <div className="px-3  mt-4 py-1 avatar flex justify-around align-middle items-center ">
                  <img
                    src={avatarPreview}
                    className="h-[50px] w-[50px] rounded-full"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={RegisterDataChange}
                    className="w-[70%] font-mono bg-transparent text-white rounded-md pr-3"
                  />
                </div> */}
                <div>
                  <input
                    type="submit"
                    value="Signup"
                    className="bg-black mt-4 px-2 py-1 w-[30%] rounded-xl font-bold"
                  ></input>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
