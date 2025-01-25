import React from "react";
import Rating from "./Rating";

function Feedback({ feedback }) {
  return (
    <div className={`${feedback.ownFeedback ? 'bg-green-600' : 'bg-gray-800'} text-white p-4 rounded-lg shadow-md`}>
  <div className="space-y-3">
    <p className="font-semibold text-lg">
      <strong>{feedback.username}</strong>
    </p>
    <p>
      <Rating rating={feedback.note} />
    </p>
    <p className="text-sm">{feedback.comment}</p>
  </div>
</div>

  );
}

export default Feedback;
