import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Profile } from "./Pages/Profile";
import service from "../appwite/config";
import { tweets } from "./tweetInfo";
import authService from "../appwite/auth";
export const UserProfile = () => {
  const userData = useSelector((state) => state.auth.userData);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tweetUser, setTweetUser] = useState(null);

  useEffect(() => {
    authService.findUser(id).then((user) => user && setTweetUser(user));
  }, []);
  const tweetSelector = useSelector((state) => state.tweets.allTweets);

  const img = "https://picsum.photos/id/123/40/40";

  {
    return (
      <div className="md:flex text-white ">
        {/* {console.log(user)} */}
        <img
          src={tweetUser && service.getFiles(tweetUser.profilpic)}
          alt=""
          className="rounded-full ring-2 ring-white m-4 h-36  md:h-96"
          height={500}
          width={500}
        />
        <div className="p-4 flex flex-col m-auto ">
          <ul className="flex flex-col items-start">
            <li className="mb-4">
              <h1 className="text-3xl font-sans font-bold">
                {tweetUser && tweetUser.userid}
              </h1>
            </li>
            <li className="mb-4">
              <p>username</p>
            </li>
            <li className="mb-4">
              <p className="text-start">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                eius sed eligendi iusto, voluptatum a eos. Voluptates
                repellendus eius soluta libero repudiandae recusandae, cumque
                voluptatem fugit rem nostrum enim molestias.
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
};
