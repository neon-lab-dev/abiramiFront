type TInputProps = {
  label: string;
  required?: boolean;
  inputBg: string;
  type: string;
  placeholder: string;
  iconBg?: string;
  icon?: string;
  name: string; // Added name prop to handle input names
  value?: string; // Optional value prop to bind with form state
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange handler
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
}) => {
  return (
    <div className="w-full">
      {/* -------------- Input label ------------- */}
      <label className="pb-2">
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
          value={value} // Bind value from form state
          onChange={onChange} // Trigger the onChange function when input changes
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
