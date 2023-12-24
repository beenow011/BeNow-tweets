import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Profile } from "./Pages/Profile";
import service from "../appwite/config";
import { tweets } from "./tweetInfo";
import authService from "../appwite/auth";
import { CardTemplate } from "./CardTemplate";
export const UserProfile = () => {
  const userData = useSelector((state) => state.auth.userData);
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tweetUser, setTweetUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const posts = await service.getPosts();
        if (posts && posts.documents) {
          setTweetUser(posts.documents);

          const foundUser = posts.documents.find((tweet) => tweet.$id === id);
          if (foundUser) {
            setUser(foundUser);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle the error (e.g., set an error state, show a message)
      }
    };

    fetchUser();
  }, []);
  const tweetSelector = useSelector((state) => state.tweets.allTweets);

  const img = "https://picsum.photos/id/123/40/40";

  // if (!user) {
  //   return <div className="text-white">Loading</div>;
  // }
  return (
    <div className="md:flex text-white ">
      {/* {console.log("tu : ", user)} */}
      <img
        src={user && service.getFiles(user.profilpic)}
        alt=""
        className="rounded-full ring-2 ring-white m-4 h-36 w-36 md:h-96 md:w-96 mx-auto"
      />
      <div className="p-4 flex flex-col m-auto ">
        <ul className="flex flex-col items-start">
          <li className="mb-4">
            <h1 className="text-3xl font-sans font-bold">
              {user && user.userid}
              {/* {tweetUser && tweetUser.userid} */}
            </h1>
          </li>
          <li>{user && user.bio}</li>
          <li className="mb-4">
            {user ? (
              <CardTemplate
                id={user.$id}
                userId={user.userid}
                tweet={user.msg}
                img={user.profilpic}
                likeCountPrev={
                  user.likecount !== undefined ? user.likecount : 0
                }
              />
            ) : null}
          </li>
        </ul>
      </div>
    </div>
  );
};
