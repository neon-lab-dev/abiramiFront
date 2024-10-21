type TInputProps = {
  label: string;
  required?: boolean;
  inputBg: string;
  type: string;
  placeholder: string;
  iconBg: string;
  icon?: string;
};

const InputField: React.FC<TInputProps> = ({
  label,
  required = false,
  inputBg,
  placeholder,
  iconBg,
  type,
  icon,
}) => {
  return (
    <div className="w-full">
      {/* -------------- there is input label ------------- */}
      <label className="pb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {/* ------------------ Input fields -------------------- */}
      <div
        className={`relative ${
          label ? "mt-2" : null
        }  rounded-md w-full ${inputBg}`}
      >
        <input
          type={`${type ? type : "text"}`}
          className="w-full px-4 py-2 rounded-md border bg-transparent outline-none"
          placeholder={placeholder}
        />
        {icon && (
          <div
            className={`absolute top-3 right-3 flex justify-center items-center ${iconBg}`}
          >
            <img
              src={icon}
              alt="search-icon"
              className={`w-4 ${inputBg} h-4`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;