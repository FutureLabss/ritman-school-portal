import React from "react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label: string;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled = false,
  className = "",
  type,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${disabled ? "cursor-not-allowed" : ""} ${className}`}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
