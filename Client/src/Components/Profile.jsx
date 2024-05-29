import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,deleteUserStart,deleteUserSuccess,deleteUserFailure,
  signOutStart,
  signOutFailure,
  signOutSuccess
} from "../redux/user/userSlice.js";



const Profile = () => {
  const fileRef = useRef(null);

  const [formData, setformData] = useState({});

  const [progress, setProgress] = useState("");

  const [image, setImage] = useState(false);

  const [imageError, setImageerror] = useState(null);

  const dispatch = useDispatch();

  const [updateSuccess,setUpdateSuccess]=useState(false)

  const{currentUser,loading,error} = useSelector((state)=>state.user)

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  async function handleFileUpload(image) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
      },
      (error) => {
        setImageerror(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageerror(false);
          setformData({ ...formData, profilePicture: downloadUrl });
      
        });
      }
    );
  }

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleForm = async (e) => {

    e.preventDefault();
    
    try {
      dispatch(updateUserStart());
 
      const res = await fetch(`/auth/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)

   
    } catch (error) {
      
      dispatch(updateUserFailure(error));
    }

  };

  const handleUserDelete= async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/auth/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

const handleSignOut = async(e)=>{
  e.preventDefault()
      try {
        dispatch(signOutStart())
        await fetch('/auth/user/sign-out',{
          method : 'GET',
        })
        dispatch(signOutSuccess())

      } catch (error) {
        dispatch(signOutFailure(error))
      }
}

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-4xl  font-semibold text-center my-7 ">Profile</h1>
      <form onSubmit={handleForm} className="flex flex-col gap-6 my-9">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="pic"
          onChange={handleChange}
          className=" h-24 w-24 rounded-full self-center cursor-pointer object-cover"
          onClick={() => {
            fileRef.current.click();
          }}
        />
        {imageError ? (
          <p className="self-center text-red-600 text-sm">
            {" "}
            Error Uploading! (Check file type and size must be less than 2MB)
          </p>
        ) : progress > 0 ? (
          <p className="self-center text-green-600 text-sm">{`${progress} % Uploaded`}</p>
        ) : (
          ""
        )}
        <input
          defaultValue={currentUser.userName}
          type="text"
          id="userName"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3
        "
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-100 rounded-lg p-3
        "
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-100 rounded-lg p-3
        "
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-blue-100 bg-slate-800 p-3 rounded-lg uppercase"
        >
          {loading? "Updating...":"Update"}
        </button>
        <div className="flex justify-between">
          <button type="button" onClick = {handleUserDelete} className="text-red-600">
            Delete Account
          </button>
          <button type="button" onClick={handleSignOut} className="text-red-600">
            Sign Out
          </button>
          
        </div>
        {error?
        <p className="text-red-600 mt-1 self-center">{error && 'Something went wrong'}</p>:
          <p className=" font-bold text-green-500 mt-1 self-center">{updateSuccess && <span>Updated &#x2714;</span>}</p>
        }
        </form>
    </div>
    );
  }

export default Profile;
