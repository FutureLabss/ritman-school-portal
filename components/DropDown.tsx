import React from "react";

interface DropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  className = "",
  name,
}) => {
  return (
    <select
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      className={`dropdown ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
