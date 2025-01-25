import React from 'react';

function NoBooksMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-700">No Books Available</h1>
      <p className="mt-2 text-gray-500 text-center">
        It looks like your library is empty. Add some books to get started!
      </p>
      {/* <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        onClick={() => alert('Navigate to Add Books Page')}
      >
        Add Books
      </button> */}
    </div>
  );
}

export default NoBooksMessage;
