import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleOAuth = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/')
    }
    
    
    catch (error) {
      console.log("Could Not connect to google");
    }
  };

  

  return (
    <button
      type="button"
      onClick={handleOAuth}
      className="bg-red-700 rounded-lg  text-2xl  text-white p-2 uppercase hover:opacity-90 disabled:opacity-10 text-center"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
