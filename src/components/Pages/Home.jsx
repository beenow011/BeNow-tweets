import React, { useEffect, useState } from "react";
import { CardTemplate } from "../CardTemplate";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import service from "../../appwite/config";
import Banner from "../Banner";
import logo from "../../assets/logo2.png";
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
      <div>
        <Banner />
      </div>
      <h1 className="text-3xl font-bold text-start p-5 text-white">
        Top tweets
      </h1>

      <div className="md:grid sm:max-md:grid-cols-2 md:grid-cols-3 md:gap-2">
        {newArray.map(
          (tweetInfo, i) =>
            tweetInfo && (
              <CardTemplate
                key={i}
                id={tweetInfo.$id}
                userId={tweetInfo.userid}
                tweet={tweetInfo.msg}
                img={tweetInfo.profilpic}
                likeCountPrev={
                  tweetInfo.likecount !== undefined ? tweetInfo.likecount : 0
                }
              />
            )
        )}
        {console.log(newArray)}
        {console.log("in home", newArray[0].likecount)}
      </div>
    </div>
  ) : (
    <>
      <img src={logo} className="m-auto" width={300} />
      <p className="text-white  text-2xl ">login or signup</p>
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
