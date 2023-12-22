import React from "react";

function Banner() {
  return (
    <div className=" m-3 bg-gradient-to-r from-[#ff005d] via-[#db3874] to-[#ec5990] rounded-md p-6">
      <div>
        <h1 className="text-start text-[#6c263b] p-3 text-3xl font-bold font-mono">
          Hello users..!
        </h1>
        <p className="text-start p-3 text-lg font-bold text-white font-mono">
          Welcome to "Be Now" 😊, it's a twitting website, where you can share
          your thoughts.
          <br></br> Many more features to come, stay tuned..!🥳
        </p>
      </div>
    </div>
  );
}

export default Banner;
