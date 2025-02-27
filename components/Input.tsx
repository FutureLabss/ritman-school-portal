"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  name?: string;
  required?: boolean;
  maxLength?: number;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  checked?: boolean;
  id?: string;
  readOnly?: boolean;
  defaultValue?: string;
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
  required,
  maxLength,
  onPaste,
  ref,
  checked,
  id = "",
  readOnly,
  defaultValue,
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
        required={required}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onPaste={onPaste}
        ref={ref}
        checked={checked}
        id={id}
        readOnly={readOnly}
        defaultValue={defaultValue}
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
