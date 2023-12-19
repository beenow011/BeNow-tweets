import React, { useEffect, useState } from "react";
import { CardTemplate } from "../CardTemplate";
import { useSelector } from "react-redux";
export const Home = () => {
  const tweetSelector = useSelector((state) => state.tweets.allTweets);
  const [tweets, setTweets] = useState(tweetSelector);

  return (
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
  );
};
