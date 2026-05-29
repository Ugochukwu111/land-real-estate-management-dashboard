export default function FormInput({
  label,
  type = "text",
  name,
  id,
  placeholder,
  value,
  error,
  icon,
  autoComplete,
  onChange,
  onBlur,
  className
}) {
  return (
    <div className={`flex flex-col input-container ${className}`}>

      <div className="flex justify-between items-center">
        <label htmlFor={id}>{label}</label>

        <span className="errorMsg text-fail">
          {error}
        </span>
      </div>

      <input
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
      />

      {icon}

    </div>
  );
}