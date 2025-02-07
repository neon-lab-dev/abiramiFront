import React, { useState } from "react";

type TInputProps = {
  label: string;
  required?: boolean;
  inputBg: string;
  type: string;
  placeholder?: string;
  iconBg?: string;
  icon?: string;
  name: string;
  value?: string | number | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  validate?: (value: string) => string | null; // Validation function
};

const InputField: React.FC<TInputProps> = ({
  label,
  required = false,
  inputBg,
  placeholder,
  iconBg,
  type,
  icon,
  name,
  value,
  onChange,
  readOnly,
  validate,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);

    if (validate) {
      const validationError = validate(e.target.value);
      setError(validationError);
    }
  };

  return (
    <div className="w-full">
      <label className="pb-2 block">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div
        className={`relative ${label ? "mt-2" : ""} rounded-md w-full ${inputBg}`}
      >
        <input
          type={type}
          className="w-full px-4 py-2 rounded-md border bg-transparent outline-none"
          placeholder={placeholder}
          name={name}
          value={value !== null ? value : undefined}
          onChange={handleChange}
          readOnly={readOnly}
          autoComplete="off"
        />
        {icon && (
          <div
            className={`absolute top-3 right-3 flex justify-center items-center ${iconBg}`}
          >
            <img src={icon} alt="input-icon" className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
