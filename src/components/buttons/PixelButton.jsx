import React from "react";

const PixelButton = ({ onClick, text, imageSrc }) => {
  return (
    <button
      onClick={onClick}
      className="relative focus:outline-none group mx-2 hover:scale-105 transition-all duration-300 border-none rounded-2xl"
      style={{ outline: 'none' }}    >
      <img
        src={`/assets/buttons/button_${imageSrc}.png`}
        alt=""
        className={`w-[14rem] lg:w-[16rem] h-[4.5rem] rounded-2xl  filter group-hover:brightness-[1.1]`}
      />
      <span className="absolute inset-0 flex items-center justify-center text-gray-100 group-hover:text-white text-[1.3rem]">
        {text}
      </span>
    </button>
  );
};

export default PixelButton;


