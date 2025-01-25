import React, { useState, useEffect } from "react";

function Popup({ bgColor, heading, msg }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const cancelPopupHandler = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-4 right-4 z-50 p-4 w-64 rounded-lg shadow-lg ${bgColor}`}
          style={{
            transition: "opacity 0.3s ease",
          }}
        >
          <button
            onClick={cancelPopupHandler}
            className="absolute top-2 right-2 text-xl text-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-center text-white">
            {heading}
          </h2>
          <p className="text-sm text-white text-center mt-2">{msg}</p>
        </div>
      )}
    </>
  );
}

export default Popup;
