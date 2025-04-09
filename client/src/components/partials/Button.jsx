import React from 'react';

const Button = ({ title, short = false }) => {
  return (
    <button
      className={`
        ${short ? 'px-2 py-1.5 text-xs' : 'px-5 py-2.5 text-base'}
        bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300
        hover:from-gray-200 hover:via-gray-300 hover:to-gray-400
        active:from-gray-300 active:to-gray-500
        text-gray-800
        rounded-xl shadow-md
        border border-gray-300
        font-semibold
        transition-all duration-200 ease-in-out
        uppercase w-full cursor-pointer
      `}
    >
      {title}
    </button>
  );
};

export default Button;
