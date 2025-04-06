import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="animate-pulse text-amber-400 text-lg">
          Loading connections...
        </div>
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 text-center max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-amber-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-white mb-2">
            No Connections Found
          </h1>
          <p className="text-white/70">You haven't made any connections yet</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-8 text-center">
          Your Connections
        </h1>

        <div className="space-y-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;

            return (
              <div
                key={_id}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-lg flex flex-col md:flex-row items-center gap-6 transition-all hover:bg-white/10"
              >
                <div className="flex-shrink-0">
                  <img
                    alt={firstName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-amber-500/30"
                    src={photoUrl || "/default-avatar.png"}
                  />
                </div>

                <div className="flex-1 text-left">
                  <h2 className="text-xl font-semibold text-white">
                    {firstName} {lastName}
                  </h2>
                  {(age || gender) && (
                    <p className="text-amber-300 text-sm">
                      {[age, gender].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {about && <p className="text-white/80 mt-2">{about}</p>}
                </div>

                <Link
                  to={"/chat/" + _id}
                  className="flex-shrink-0 w-full md:w-auto"
                >
                  <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-2 px-6 rounded-lg shadow hover:shadow-amber-500/20 transition-all">
                    Chat
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
