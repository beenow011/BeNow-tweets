import React, { useState } from "react";
import birdbg from "../../assets/birdbg.png";
import { tweets } from "../tweetInfo";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTweet } from "../../store/tweetslice";
import service from "../../appwite/config";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
export const Tweets = () => {
  const userStatus = useSelector((state) => state.auth.status);

  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      msg: "",
      id: userStatus ? userData.$id : null,
      userid: userStatus
        ? `@${userData.name.toLowerCase().replace(/\s/g, "")}`
        : "",
      profilpic: userStatus ? userData.prefs.fileId : null,
      bio: userStatus ? userData.prefs.bio : null,
    },
  });
  const [Tweet, setTweet] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    console.log("Input Value:", userData.prefs.fileId);

    setTweet(inputValue);
    setValue("msg", inputValue);
  };
  const Submit = async (data) => {
    console.log("Input Value:", userData.prefs.fileId);

    if (data.msg.length > 0) {
      console.log(data);
      const dbPost = await service.createPost({ ...data });
      toast.success("Tweeted..!");
      setTweet("");
    } else {
      alert("tweet must be min of 1 char.");
    }
  };
  return userStatus ? (
    <div className="p-5">
      <div>
        <Toaster />
      </div>
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
