const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  icon,
}) => {
  return (
    <div className={`form-group ${error ? 'has-error' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={icon ? 'with-icon' : ''}
        />
      </div>
      {error && <span className="field-error">{error}</span>}
    </div>
  );
};

export default FormInput;
