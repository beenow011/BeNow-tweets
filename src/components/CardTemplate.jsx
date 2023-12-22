import React, { useEffect } from "react";
import like from "../assets/like3.png";
import liked from "../assets/liked.png";
import { Link } from "react-router-dom";
import service from "../appwite/config";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { UserProfile } from "./UserProfile";
export const CardTemplate = ({
  key,
  id,
  userId,
  tweet,
  likeCountPrev,
  img,
}) => {
  const [users, setUsers] = useState({});
  const [likeCount, setLikeCount] = useState(likeCountPrev);

  const [isLike, setIsLike] = useState(false);
  // console.log(id);
  console.log(likeCountPrev);

  // useEffect(() => {
  //   console.group("id:", id);
  //   console.group("likeCountPrev:", likeCountPrev);

  //   if (id && likeCountPrev)
  //     service
  //       .updateLike(id, { likecount: likeCount })
  //       .then((update) => console.log(update));
  // }, [likeCount]);

  const handelLike = async (e) => {
    if (!isLike) {
      e.target.src = liked;
      setLikeCount((prev) => prev + 1);
      setIsLike(true);
      if (id && likeCountPrev)
        service
          .updateLike(id, { likecount: likeCount })
          .then((update) => console.log(update));
    } else {
      e.target.src = like;
      setLikeCount((prev) => prev - 1);
      setIsLike(false);
      if (id && likeCountPrev)
        service
          .updateLike(id, { likecount: likeCount })
          .then((update) => console.log(update));
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

  return (
    <div>
      <Card className="mt-6 z-0 relative  w-65 md:w-64 lg:w-80 m-5 ring-2 shadow-black ring-gray-800 min-h-fit bg-[#1c1c21] text-white">
        <CardBody>
          <Link to={`userprofile/${id}`}>
            <Typography variant="h5" color="blue-gray" className="mb-2 flex">
              <img
                src={img && service.getFiles(img)}
                className="rounded-full mr-2 ring-2 ring-black"
                width={30}
                height={30}
              />
              <p className=" text-blue-200">{userId}</p>
            </Typography>
          </Link>
          <Typography className="break-words">{tweet}</Typography>
        </CardBody>
        <CardFooter className="pt-0 flex">
          <img
            src={like}
            onClick={handelLike}
            width={24}
            height={24}
            color="white"
          />
          <h3 className="pl-3">{likeCount}</h3>
        </CardFooter>
      </Card>
    </div>
  );
};
