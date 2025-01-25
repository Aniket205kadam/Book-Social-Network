import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import Textarea from "../components/Textarea";
import bookService from "../services/BookService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UploadBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const token = useSelector((state) => state.authentication.jwtToken);

  const uploadBook = async (data) => {
    try {
      const response = await bookService.uploadBook(data, token);
      if (response) {
        const imageResponse = await bookService.uploadImage(response, data.file[0], token);
        if (imageResponse === 202) {
          navigate(`/book/${response}`)
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8 pt-20">
      {error && (<p className="text-red-600">{error}</p>)}
      <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Upload Book
      </h1>
      <form onSubmit={handleSubmit(uploadBook)} className="space-y-6">
        <div>
          <Input
            label="Title"
            type="text"
            placeholder="Enter book title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <Input
            label="Author Name"
            type="text"
            placeholder="Enter author name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            {...register("author", { required: "Author name is required" })}
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>
        <div>
          <Input
            label="ISBN"
            type="text"
            placeholder="Enter book isbn number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            {...register("isbn", { required: "Isbn is required" })}
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Synopsis
          </label>
          <Textarea
            rows="4"
            placeholder="Write a brief synopsis..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            {...register("synopsis", { required: "Synopsis is required" })}
          />
          {errors.synopsis && (
            <p className="text-red-500 text-sm">{errors.synopsis.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <input type="checkbox" {...register("shareable")} />
          <label className="text-sm font-medium text-gray-600">
            Make this book shareable
          </label>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Upload File
          </label>
          <input type="file" id="file" {...register("file")} />
          {errors.file && (
            <p className="text-red-500 text-sm">{errors.file.message}</p>
          )}
        </div>
        <div>
          <Button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadBook;
