import { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState(false);

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="animate-pulse text-amber-400 text-lg">
          Loading profile...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 bg-gradient-to-b from-gray-900 to-black">
      {isEditing ? (
        <EditProfile user={user} onCancel={() => setIsEditing(false)} />
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-lg shadow hover:shadow-amber-500/20 transition-all"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 shadow-xl">
            {/* Enhanced Profile Image Section */}
            <div className="relative h-80 w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-black/60 z-10"></div>
              <img
                src={user.photoUrl || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <div className="flex items-end gap-6">
                  <div className="w-32 h-32 rounded-full border-4 border-amber-500/50 overflow-hidden shadow-lg">
                    <img
                      src={user.photoUrl || "/default-avatar.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {user.firstName} {user.lastName}
                    </h2>
                    {user.age && (
                      <p className="text-amber-300 text-lg">
                        {user.age} years old
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-amber-400 mb-2">
                    Contact
                  </h3>
                  <p className="text-white text-lg">{user.emailId}</p>
                </div>
                {user.gender && (
                  <div>
                    <h3 className="text-sm font-medium text-amber-400 mb-2">
                      Gender
                    </h3>
                    <p className="text-white text-lg">{user.gender}</p>
                  </div>
                )}
              </div>

              {user.about && (
                <div>
                  <h3 className="text-sm font-medium text-amber-400 mb-2">
                    About
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {user.about}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
