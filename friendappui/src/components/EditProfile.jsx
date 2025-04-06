import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  // Keep all existing state and logic exactly the same
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Edit Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-center text-amber-400 mb-6">
              Edit Profile
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-900/30 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    First Name:
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-100 mb-1">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-1">
                  Photo URL:
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Age Input - Updated to match styling */}
                <div className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-amber-100">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="input input-bordered w-full bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-amber-500"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                {/* Gender Select - Kept your exact structure */}
                <div className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-amber-100">Gender:</span>
                  </div>
                  <select
                    className="select select-bordered w-full bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-amber-500"
                    value={gender}
                    onChange={(e) => setGender(e.target.value.toLowerCase())}
                  >
                    <option value="" disabled className="bg-gray-800">
                      Select Gender
                    </option>
                    <option value="male" className="bg-gray-800">
                      Male
                    </option>
                    <option value="female" className="bg-gray-800">
                      Female
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-100 mb-1">
                  About:
                </label>
                <textarea
                  value={about}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition min-h-[100px]"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={saveProfile}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-2 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl sticky top-24">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">
              Profile Preview
            </h3>
            <UserCard
              user={{ firstName, lastName, photoUrl, age, gender, about }}
            />
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-amber-600 text-white shadow-lg">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
