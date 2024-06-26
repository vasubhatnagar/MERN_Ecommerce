import { Fragment, useEffect, useRef, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeEditPopup } from "../../../actions/popupActions";
import { loadUser, profileUpdate } from "../../../actions/userActions";
import { useAlert } from "react-alert";
const EditProfilePopup = () => {
  const EditPopup = useRef();
  const alert = useAlert();
  const { editPopup } = useSelector((state) => state.popup);
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const closePopup = () => {
    dispatch(closeEditPopup());
  };

  const updateProfile = (e)=>{
    e.preventDefault();
    console.log("Profile saved");
    const MyForm = new FormData();
    MyForm.set("name",name);
    MyForm.set("email",email);
    dispatch(profileUpdate(MyForm));
    dispatch(loadUser());
    closePopup();
    alert.success("User Updated!")
  }
  useEffect(() => {

    if(user){
      setName(user.name);
      setEmail(user.email);
    }
    if (editPopup) {
      EditPopup.current.style.display = "block";
    } else {
      EditPopup.current.style.display = "none";
    }
  }, [editPopup]);
  return (
    <Fragment>
      <div
        ref={EditPopup}
        className="fixed hidden min-w-[100vw] min-h-[100vh] top-0 left-0 backdrop-blur-sm "
      >
        <div className=" py-24 shadow-2xl border-2 border-black absolute text-black bg-white font-mono rounded-xl p-5 top-1/4 left-1/2 ml-[-175px] min-w-[350px]text-center">
          <p className="font-bold">Edit your profile details below!!</p>
          <FaRegWindowClose
            className="absolute top-3 right-3"
            size={22}
            onClick={closePopup}
          />
          <form onSubmit={updateProfile}>
          <div className="flex justify-evenly mt-3">
            <p>Name : </p>
            <input
              className=" ml-2 border-2 border-black rounded-3xl px-2"
              type="text"
              value={name}
              required
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>

          <div className="flex mt-3 justify-evenly">
            <p>E-Mail : </p>
            <input
              className="ml-2 truncate border-2 border-black rounded-3xl px-2"
              type="email"
              value={email}
              required
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <input value={"Update"} type="submit" className=" mt-5 px-3 py-1 bg-cyan-900 text-white font-bold font-mono rounded-3xl">
           
          </input>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfilePopup;
