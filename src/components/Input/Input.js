import "./Input.scss";

function Input({ label, name, onChange, value, type, error }) {
  return (
    <div className="field ">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        className="field__input"
      />
      {error && <p className="field__error">{error}</p>}
    </div>
  );
}

export default Input;
