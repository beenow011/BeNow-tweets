import React, { useEffect, useState } from "react";
import { MyTweet } from "../MyTweet";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../../appwite/auth";
import { login } from "../../store/authSlice";
import dp from "../../assets/dp.jpg";
import service from "../../appwite/config";
export const Profile = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  // const username = userData.name;
  // console.log(userData.prefs);
  // const [tweets,setTweets]=useState([])
  const [user, setUser] = useState(userData);
  const [bio, setBio] = useState(userData.prefs.bio);
  const [edit, setEdit] = useState(false);
  const tweetSelector = useSelector((state) => state.tweets.allTweets);
  const [tweets, setTweets] = useState([]);
  const fileId = userData.prefs.fileId;
  // let myTweets = [];
  const handleSubmit = async () => {
    setEdit((state) => !state);
    const updatedPref = await authService.updateUser({ fileId, bio });

    // console.log(updatedPref);
  };
  useEffect(() => {
    authService.getCurrentUser().then((currentUser) => {
      dispatch(login(currentUser));
      setUser(currentUser);
    });
  }, [bio, fileId]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        const newTweets = posts.documents.filter(
          (tweet) => tweet.id === userData.$id
        );
        setTweets(newTweets);
      }
    });
  }, []);
  // console.log(userData);
  // console.log(tweets);
  const newArray = tweets.slice().reverse();

  // useEffect(() => {
  //   setTweets(tweets.filter((tweet) => tweet.userId === userData.name));

  //   // console.log(tweets);
  // }, [tweets]);
  return userStatus ? (
    <div className="md:flex text-white ">
      {/* {console.log(username)} */}

      <img
        src={service.getFiles(userData.prefs.fileId)}
        alt=""
        width={380}
        height={390}
        className="rounded-md ring-2 ring-white m-4 w-36 h-36  md:h-96 md:w-96"
      />
      <div className="p-4 flex flex-col m-auto w-full">
        <ul className="flex flex-col items-start">
          <li className="mb-4">
            <h1 className="text-3xl font-sans font-bold">
              @{userData.name.toLowerCase().replace(/\s/g, "")}
            </h1>
          </li>
          <li className="mb-4">
            <p className="text-gray-700 text-2xl">{userData.name}</p>
          </li>
          <li className="mb-4 flex gap-3">
            {edit ? (
              <textarea
                className="text-start w-full bg-gray-800"
                type="text"
                value={bio}
                placeholder="write your bio"
                maxLength={200}
                onChange={(e) => setBio(e.target.value)}
              />
            ) : (
              <p className="text-start">{bio}</p>
            )}

            {!edit ? (
              <div
                onClick={() => setEdit((state) => !state)}
                className="cursor-pointer "
              >
                {" "}
                <span className="material-symbols-outlined">edit</span>
              </div>
            ) : (
              <div>
                <button
                  className="bg-white text-black p-1 rounded-md"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            )}
          </li>
        </ul>
        <h1 className="text-start text-3xl font-bold ">Your tweets</h1>
        <div className="lg:grid lg:grid-cols-2 ">
          {newArray.length > 0 ? (
            newArray.map((tweetInfo, i) => (
              <MyTweet
                id={tweetInfo.$id}
                key={i}
                userId={tweetInfo.userid}
                tweet={tweetInfo.msg}
                likeCountPrev={Math.floor(Math.random() * 20)}
                img={tweetInfo.img}
              />
            ))
          ) : (
            <div className="flex  ">
              <p className="text-start text-gray-800 text-xl h-5">No tweets</p>
              <Link to="/tweets">
                {" "}
                <button className="bg-blue-500 rounded-lg p-1 ml-2 text-white hover:bg-blue-700">
                  First tweet
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <>
      <Link to="/login">
        <h1 className="text-white text-3xl font-mono font-bold underline hover:text-pink-300 p-5">
          Login to show your profile
        </h1>
      </Link>
    </>
  );
};
