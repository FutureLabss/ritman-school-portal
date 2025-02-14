"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  name?: string;
  checked?: boolean;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  icon,
  name,
  checked,
  id = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`input-wrapper ${className} relative`}>
      <input
        type={type === "password" && showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        checked={checked}
        id={id}
        className="input w-full border-none focus:outline-none py-1"
      />
      {type === "password" && (
        <span
          onClick={handleTogglePassword}
          className="icon absolute right-4 top-4"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
      {icon && <span className="icon">{icon}</span>}
    </div>
  );
};

export default Input;
