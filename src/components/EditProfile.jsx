import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showMsg,setShowMsg]=useState(false);
  const dispatch = useDispatch();
  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          about,
          gender,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
        setShowMsg(true);
        setTimeout(() => {
            setShowMsg(false);
        }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start gap-8 p-10 h-[80vh]">
        {/* Form */}
        <div className="w-1/2 h-full overflow-y-auto bg-gray-800 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

          <div className="space-y-4">
            <div>
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label>Photo URL:</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label>Age:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 rounded"
              />
            </div>
            <div>
              <label>Gender:</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 rounded"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label>About:</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-2 mt-1 bg-gray-700 rounded"
                rows="3"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="w-1/2 h-full overflow-y-auto bg-gray-900 rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white text-center">
            Live Preview
          </h2>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, about, gender }}
          />
        </div>
      </div>
      {showMsg&&<div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
