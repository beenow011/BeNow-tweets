import React from "react";
import like from "../assets/like3.png";
import liked from "../assets/liked.png";
import option from "../assets/option.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../appwite/config";
import { toast, Toaster } from "react-hot-toast";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { dltTweet } from "../store/tweetslice";
export const MyTweet = ({ userId, tweet, likeCountPrev, img, id }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [likeCount, setLikeCount] = useState(likeCountPrev);
  const [isLike, setIsLike] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const handelLike = (e) => {
    if (!isLike) {
      e.target.src = liked;
      setLikeCount((prev) => prev + 1);
      setIsLike(true);
    } else {
      e.target.src = like;
      setLikeCount((prev) => prev - 1);
      setIsLike(false);
    }
  };

  const handleUser = (e) => {
    e.preventDefault();
    setUsers({
      userId,
      bio: tweet,
      img,
    });
  };

  const handleChange = (e) => {
    if (e.target.value === "dlt") {
      service.deletePost(id);
      dispatch(dltTweet(id));

      navigate("/");
    }
  };
  return (
    <div>
      <Card className="mt-6 w-80 md:m-5 ring-2 text-white bg-white/25  shadow-black ring-gray-400/40 min-h-fit bg-[#1c1c21]">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2 flex">
            <img
              src={service.getFiles(userData.prefs.fileId)}
              className="rounded-full mr-2 ring-2 ring-black"
              width={30}
              height={30}
            />
            <p className="text-white">{userId}</p>
            <select
              name="option"
              value=""
              id=""
              className={`ml-auto block rounded-full  text-sm font-medium   bg-white/0 text-white`}
              onChange={handleChange}
            >
              <option></option>
              <option value="dlt">delete tweet</option>
            </select>
          </Typography>

          <Typography className="overflow-wrap break-words">{tweet}</Typography>
        </CardBody>
        <CardFooter className="pt-0 flex">
          <img src={like} onClick={handelLike} width={24} height={24} />
          <h3 className="pl-3">{likeCount}</h3>
        </CardFooter>
      </Card>
    </div>
  );
};
