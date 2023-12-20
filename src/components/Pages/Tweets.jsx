import React, { useState } from "react";
import birdbg from "../../assets/birdbg.png";
import { tweets } from "../tweetInfo";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTweet } from "../../store/tweetslice";
import service from "../../appwite/config";
import { useForm } from "react-hook-form";
export const Tweets = () => {
  const userStatus = useSelector((state) => state.auth.status);

  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      userid: userStatus
        ? `@${userData.name.toLowerCase().replace(/\s/g, "")}`
        : "",
      msg: "",

      profil_pic: userStatus
        ? `https://picsum.photos/id/${userData.$createdAt.slice(
            21,
            23
          )}/2000/2000`
        : "",
      id: userStatus ? userData.$id : null,
    },
  });
  const [Tweet, setTweet] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    // console.log("Input Value:", inputValue);

    setTweet(inputValue);
    // console.log("Tweet:", Tweet);

    setValue("msg", inputValue);

    // console.log('Updated "msg":', getValue("msg"));
  };
  const Submit = async (data) => {
    console.log(data);
    if (data.msg.length > 0) {
      // e.preventDefault();
      // setValue("msg", Tweet);

      console.log(data.msg);
      dispatch(addTweet(Tweet));
      const dbPost = await service.createPost({ ...data });
      console.log(dbPost);
      setTweet("");
    } else {
      alert("tweet must be min of 1 char.");
    }
  };
  return userStatus ? (
    <div className="p-5">
      <form action="" onSubmit={handleSubmit(Submit)}>
        <h1 className="text-3xl text-gray-700 font-bold text-left ">
          What's on your mind...!?
        </h1>
        <div
          className="flex items-start bg-[url('../assets/birdbg.png') bg-cover] overflow-hidden"
          id="bg"
        >
          <textarea
            className="w-96 h-96 rounded-lg shadow-md shadow-black p-5 mt-6 font-mono bg-[#1c1c21] text-white "
            placeholder=" Tweet here...!"
            wrap="soft"
            maxLength="500"
            minLength="1"
            id="textbox"
            value={Tweet}
            onChange={handleChange}
          ></textarea>
          <button
            className="p-3 bg-[#ec5990] ml-3 md:ml-10 rounded-md hover:bg-blue-gray-900 text-blue-gray-100 mt-auto"
            type="submit"
          >
            Tweet
          </button>

          <img
            src={birdbg}
            alt=""
            width={100}
            className="m-10 hidden md:inline"
          />
          <img
            src={birdbg}
            alt=""
            width={100}
            className="m-10 mt-auto hidden md:inline"
          />
          <img
            src={birdbg}
            alt=""
            width={100}
            className="m-10 hidden md:inline"
          />
        </div>
      </form>
    </div>
  ) : (
    <>
      <Link to="/login">
        <h1 className="text-white text-3xl font-mono font-bold underline hover:text-pink-300 p-5">
          Login to tweet
        </h1>
      </Link>
    </>
  );
};
