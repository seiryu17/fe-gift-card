import React, { useState, useRef } from "react";
import CardForm from "./components/CardForm";
import CardPreview from "./components/CardPreview";

const App = () => {
  const [cardData, setCardData] = useState({
    dear: "",
    message: "",
    from: "",
    template: "/assets/template.jpg",
  });

  const previewRef = useRef();

  const handleUpdateCard = (updatedData) => {
    setCardData({ ...cardData, ...updatedData });
  };

  const handleDownload = () => {
    if (previewRef.current) {
      previewRef.current.triggerDownload();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen p-4 bg-gray-100 gap-6">
      <div className="w-full bg-white shadow rounded p-4 max-w-md m-auto">
        <h1 className="flex justify-center mt-2 text-2xl font-bold mb-4 text-center lg:text-left">
          Gift Card
        </h1>
        <div className="w-full flex justify-center">
          <CardPreview ref={previewRef} cardData={cardData} />
        </div>
        <CardForm cardData={cardData} onUpdate={handleUpdateCard} />
        <div className="flex justify-center ">
          <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-[#55B463] text-white rounded"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
