import "./Input.scss";

function Input({ label, name, type }) {
  return (
    <div className="field ">
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input type={type} id={name} name={name} className="field-input" />
    </div>
  );
}

export default Input;
