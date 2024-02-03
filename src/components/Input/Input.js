import "./Input.scss";

function Input({ label, name, onChange, value, type }) {
  return (
    <div className="field ">
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        className="field-input"
      />
    </div>
  );
}

export default Input;
