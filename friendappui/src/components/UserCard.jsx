import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 shadow-xl w-full max-w-md">
      {/* Enhanced Profile Image */}
      <div className="relative h-72 w-full">
        <img
          src={photoUrl || "/default-profile.jpg"}
          alt={`${firstName}'s profile`}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">
            {firstName} {lastName}
          </h2>
          {(age || gender) && (
            <p className="text-amber-300">
              {[age, gender].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {about && (
          <div className="mb-6">
            <p className="text-white/80 text-lg leading-relaxed">{about}</p>
          </div>
        )}

        {/* Enhanced Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex items-center justify-center bg-white/10 hover:bg-red-500/20 text-red-400 font-medium py-3 px-6 rounded-lg border border-white/20 hover:border-red-400/50 transition-all"
          >
           
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-amber-500/20 transition-all"
          >
           
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;