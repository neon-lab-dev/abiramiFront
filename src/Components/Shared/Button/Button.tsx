import React from "react";

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  imgSrc?: string;
  bgColor?: string;
  iconClassName?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  imgSrc,
  bgColor,
  iconClassName,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-md flex justify-center items-center gap-2 ${bgColor}`}
    >
      {imgSrc && (
        <img src={imgSrc} alt={text} className={`w-4  h-4 ${iconClassName}`} />
      )}
      {icon && <span className={iconClassName}>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;