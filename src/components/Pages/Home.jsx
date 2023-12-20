import React, { useEffect, useState } from "react";
import { CardTemplate } from "../CardTemplate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const Home = () => {
  const userStatus = useSelector((state) => state.auth.status);

  const tweetSelector = useSelector((state) => state.tweets.allTweets);
  const [tweets, setTweets] = useState(tweetSelector);

  return userStatus ? (
    <div>
      <h1 className="text-3xl font-bold text-start p-5 text-white">
        Top tweets
      </h1>

      <div className="md:grid sm:max-md:grid-cols-2 md:grid-cols-3 md:gap-2">
        {tweets.map((tweetInfo, i) => (
          <CardTemplate
            key={i}
            userId={tweetInfo.userId}
            tweet={tweetInfo.tweet}
            likeCountPrev={tweetInfo.likeCountPrev}
            img={tweetInfo.img}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="h-[100vw] md:flex justify-center gap-6 ">
      <Link to="/login">
        <h1 className="text-white text-2xl font-mono font-bold underline m-6 w-fit mx-auto bg-pink-400 rounded-lg hover:bg-white hover:text-pink-300 p-3">
          Login
        </h1>
      </Link>
      <Link to="/signup">
        <h1 className="text-white text-2xl font-mono font-bold underline m-6 w-fit mx-auto bg-pink-400 rounded-lg hover:bg-white hover:text-pink-300 p-3">
          Signup
        </h1>
      </Link>
    </div>
  );
};
