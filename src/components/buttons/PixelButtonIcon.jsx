import React from "react";

const PixelButtonIcon = ({ onClick, icon, imageSrc, }) => {
  return (
    <button
      onClick={onClick}
      className="relative focus:outline-none group"
    >
      <img
        src={`/assets/buttons/button_${imageSrc}.png`}
        alt=""
        className={`w-10 h-10 rounded-md  filter group-hover:brightness-[1.1]`}
      />
      <span className="absolute inset-0 flex items-center justify-center text-gray-100 group-hover:text-white text-[1.1rem]">
      <img
        src={icon}
        alt=""
        className={`w-8 h-8 rounded-md  filter group-hover:brightness-[1.1]`}
      />
      </span>
    </button>
  );
};

export default PixelButtonIcon;

