import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-amber-400 text-lg">
          Loading elite connections...
        </div>
      </div>
    );

  if (feed.length <= 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-center p-6">
        <div className="max-w-md bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-white mt-4">
            No New Connections Found
          </h1>
          <p className="text-white/70 mt-2">
            We've exhausted your current network suggestions. Check back later
            for more elite connections.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-24 pb-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-amber-400 mb-1">
            Potential Connection
          </h2>
          <p className="text-white/60">
            Swipe right to connect with elite entrepreneurs
          </p>
        </div>

        <div className="relative">
          {/* Glow effect behind card */}
          <div className="absolute -inset-2 bg-amber-500/20 rounded-2xl blur-lg opacity-70 animate-pulse"></div>

          {/* Main card container */}
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <UserCard user={feed[0]} />

            {/* Action buttons */}
           
          </div>
        </div>

        <div className="text-center mt-8 text-white/50 text-sm">
          <p>Only showing the most compatible matches from your network</p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
