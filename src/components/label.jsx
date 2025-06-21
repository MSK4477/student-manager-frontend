
// eslint-disable-next-line react/prop-types
const Label = ({ htmlFor, text }) => {
  return (
    <label htmlFor={htmlFor} className="block text-lg font-medium text-gray-700">
      {text}
    </label>
  );
};

export default Label;
