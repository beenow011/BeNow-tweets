import React, { useEffect, useState } from "react";
import { CardTemplate } from "../CardTemplate";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import service from "../../appwite/config";
import Banner from "../Banner";
import logo from "../../assets/logo2.png";
import { fetchTweets } from "../../store/tweetslice";

import { setTweets } from "../../store/tweetslice";
import { MyTweet } from "../MyTweet";
export const Home = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  const allTweets = useSelector((state) => state.tweets.allTweets);

  const newArray = allTweets ? allTweets.slice().reverse() : [];
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
      </div>
    </div>
  ) : (
    <>
      <div className=" bg-gradient-to-r w-80 md:w-96 mx-auto  my-5 from-[#ff005d] via-[#db3874] to-[#ec5990] rounded-md ">
        <img src={logo} className="m-auto hover:animate-pulse " width={300} />
        <p className="text-white  text-2xl ">login or signup</p>
        <div className="flex justify-center gap-6 mx-auto  ">
          <Link to="/login">
            <h1 className="text-white text-2xl font-mono font-bold  m-6 w-fit mx-auto bg-pink-800 rounded-lg hover:bg-white hover:text-pink-300 p-3">
              Login
            </h1>
          </Link>
          <Link to="/signup">
            <h1 className="text-white text-2xl font-mono font-bold  m-6 w-fit mx-auto bg-pink-800 rounded-lg hover:bg-white hover:text-pink-300 p-3">
              Signup
            </h1>
          </Link>
        </div>
      </div>
    </>
  );
};
