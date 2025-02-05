type TInputProps = {
  label: string;
  required?: boolean;
  inputBg: string;
  type: string; // Determines the type of input (text, select, etc.)
  placeholder?: string; // Optional since it's not applicable to "select"
  iconBg?: string;
  icon?: string;
  name: string; // To handle input names
  value?: string | number | null; // Optional value prop to bind with form state
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Unified onChange handler
  readOnly?: boolean;
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
}) => {
  return (
    <div className="w-full">
      {/* -------------- Input label ------------- */}
      <label className="pb-2 block">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* ------------------ Input field -------------------- */}
      <div
        className={`relative ${
          label ? "mt-2" : ""
        } rounded-md w-full ${inputBg}`}
      >
        <input
          type={type ? type : "text"}
          className="w-full px-4 py-2 rounded-md border bg-transparent outline-none"
          placeholder={placeholder}
          name={name} // Set the name prop
          value={value !== null ? value : undefined} // Bind value from form state
          onChange={onChange} // Trigger the onChange function when input changes
          readOnly={readOnly}
          autoComplete="off"
        />
        {icon && (
          <div
            className={`absolute top-3 right-3 flex justify-center items-center ${iconBg}`}
          >
            <img src={icon} alt="input-icon" className={`w-4 h-4 ${inputBg}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
