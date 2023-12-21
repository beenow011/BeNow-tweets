import React, { useEffect, useState } from "react";
import { CardTemplate } from "../CardTemplate";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import service from "../../appwite/config";
export const Home = () => {
  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const tweetSelector = useSelector((state) => state.tweets.allTweets);
  const [tweets, setTweets] = useState(tweetSelector);
  useEffect(() => {
    service.getPosts().then((posts) => {
      posts ? setTweets(posts.documents) : null;
    });
  }, []);
  const newArray = tweets.slice().reverse();
  return userStatus ? (
    <div className="z-2 relative">
      <h1 className="text-3xl font-bold text-start p-5 text-white">
        Top tweets
      </h1>
      {/* {console.log(newArray[0].likecount)} */}
      <div className="md:grid sm:max-md:grid-cols-2 md:grid-cols-3 md:gap-2">
        {newArray.map((tweetInfo, i) => (
          <CardTemplate
            key={i}
            id={tweetInfo.$id}
            userId={tweetInfo.userid}
            tweet={tweetInfo.msg}
            img={tweetInfo.profilpic}
            likeCountPrev={tweetInfo.likecount}
          />
        ))}
        {console.log(newArray[5].likecount)}
      </div>
    </div>
  ) : (
    <>
      <p className="text-white mt-10 text-2xl ">login or signup</p>
      <div className="h-[100vw] w-80 flex justify-center gap-6 mx-auto ">
        <Link to="/login">
          <h1 className="text-white text-2xl font-mono font-bold  m-6 w-fit mx-auto bg-pink-400 rounded-lg hover:bg-white hover:text-pink-300 p-3">
            Login
          </h1>
        </Link>
        <Link to="/signup">
          <h1 className="text-white text-2xl font-mono font-bold  m-6 w-fit mx-auto bg-pink-400 rounded-lg hover:bg-white hover:text-pink-300 p-3">
            Signup
          </h1>
        </Link>
      </div>
    </>
  );
};
