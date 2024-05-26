import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase.js'

const Profile = () => {
  const fileRef = useRef(null);

  const { currentUser } = useSelector((state) => state.user);

  const [formData, setformData] = useState({})

  const [progress, setProgress] = useState('')

  const [image, setImage] = useState(false)

  const [imageError, setImageerror] = useState(null)




  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }

  }, [image]);

  async function handleFileUpload(image) {

    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress))
      },
      (error) => {
        setImageerror(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadUrl) => {
            setImageerror(false)
            setformData({ ...formData, profilePicture: downloadUrl }

            )
          }

        )
      }
    )
  }
return (
  <div className="max-w-lg mx-auto p-3">
    <h1 className="text-4xl  font-semibold text-center my-7 ">Profile</h1>
    <form action="" className="flex flex-col gap-6 my-9">
      <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => {
        setImage(e.target.files[0])
      }} />
      <img
        src={formData.profilePicture || currentUser.profilePicture}
        alt="pic"
        className=" h-24 w-24 rounded-full self-center cursor-pointer object-cover"
        onClick={() => {
          fileRef.current.click();
        }}
      />
      {imageError? <p className="self-center text-red-600 text-sm"> Error Uploading! (Check file type and size must be less than 2MB)</p> :
        (progress>0? <p className="self-center text-green-600 text-sm">{`${progress} % Uploaded`}</p>: '')
      }
      <input
        defaultValue={currentUser.userName}
        type="text"
        id="Username"
        placeholder="Username"
        className="bg-slate-100 rounded-lg p-3
        "
      />
      <input
        defaultValue={currentUser.email}
        type="email"
        id="email"
        placeholder="email"
        className="bg-slate-100 rounded-lg p-3
        "
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        className="bg-slate-100 rounded-lg p-3
        "
      />
      <button
        type="submit"
        className="text-blue-100 bg-slate-800 p-3 rounded-lg uppercase"
      >
        {" "}
        Update{" "}
      </button>
      <div className="flex justify-between">
        <button type="button" className="text-red-600">
          Delete Account
        </button>
        <button type="button" className="text-red-600">
          Sign Out
        </button>
      </div>
    </form>
  </div>
);
};

export default Profile;
