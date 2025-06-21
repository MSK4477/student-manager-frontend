
// eslint-disable-next-line react/prop-types
const Input = ({ type, name, required, value, placeholder, onChange, min }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      minLength={min}
      required={required}
      className="block w-full  border-collapse px-4 py-3 mt-2 text-blue-950 border rounded-lg focus:outline-none focus:border-blue-500"
    />
  );
};

export default Input;
