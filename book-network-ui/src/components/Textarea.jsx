import React from "react";

function Textarea({ className = null, ...props }, ref) {
  return (
    <textarea
              className={className ? className : `w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ref={ref}
              {...props}
    ></textarea>
  );
}

export default React.forwardRef(Textarea);
