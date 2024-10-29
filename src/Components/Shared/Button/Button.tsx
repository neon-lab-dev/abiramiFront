import React from "react";

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  imgSrc?: string;
  color?: string;
  type?: "submit" | "reset" | "button" | undefined;
  iconClassName?: string;
  textClass?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  imgSrc,
  color,
  type,
  iconClassName,
  textClass,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${textClass=="hidden" ? "px-3": "px-5 "} py-2 rounded-xl font-medium flex justify-between items-center gap-2 ${color}`}

    >
      {imgSrc && (
        <img src={imgSrc} alt={text} className={`w-4 h-4 ${iconClassName}`} />
      )}
      {icon && <span className={iconClassName}>{icon}</span>}
      {/* Conditionally hide the text on screens smaller than 'md' */}
      <span
        className={`${
          textClass == "hidden" ? "hidden lg:inline" : "lg:inline"
        }`}
      >
        {text}
      </span>
    </button>
  );
};

export default Button;