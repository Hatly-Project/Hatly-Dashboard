import React from "react";

const Loading = () => {
  return (
    <>
      <div className="bg-white h-screen flex justify-center items-center fixed left-0 right-0 bottom-0">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-purple-800"></i>
      </div>
    </>
  );
};

export default Loading;
