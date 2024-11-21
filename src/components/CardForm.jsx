import React from "react";

const CardForm = ({ cardData, onUpdate }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onUpdate({ template: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4 shadow rounded">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="dear"
        placeholder="Dear,"
        value={cardData.dear}
        onChange={handleChange}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={cardData.message}
        onChange={handleChange}
        maxLength={32}
        rows="2"
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="from"
        placeholder="From,"
        value={cardData.from}
        onChange={handleChange}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
};

export default CardForm;
