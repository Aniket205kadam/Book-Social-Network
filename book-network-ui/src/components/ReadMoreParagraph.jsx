import React, { useState } from "react";

function ReadMoreParagraph({ paragraph, previewParaLength }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewParagraph = paragraph.slice(0, previewParaLength);

  const toggleText = () => setIsExpanded((prevState) => !prevState);

  return (
    <div>
      {isExpanded ? paragraph : previewParagraph + "..."}{" "}
      <button onClick={toggleText} className="text-blue-500">
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}

export default ReadMoreParagraph;
