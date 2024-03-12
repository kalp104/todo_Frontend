import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddingNew = ({ fetchData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an API endpoint for adding a new todo
      const response = await fetch("https://todo-backend-tawh.vercel.app/api/createTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, description: description }),
      });

      if (!response.ok) {
        throw new Error("Error in adding a new todo");
      }

      // Clear the input field and trigger a callback to update the parent component
      setTitle("");
      setDescription("");
      console.log("success");
      toast.success("we did it!!");

      fetchData();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="mt-9 pt-5 bg-[#253745] min-w-[220px] max-h-[300px] p-2 rounded-2xl  flex justify-center  items-center m-3">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-yellow-500"
          >
            Title
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter title here..."
          />

          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-yellow-500"
          >
            Description
          </label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="description"
            rows={5} // Set the number of rows to 5
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter description here..."
          />
          <button
            className="transform hover:scale-105 transition-all duration-200 ease-in-out
            text-white mt-3 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-yellow-500 dark:hover:text-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="submit"
          >
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
};

export default AddingNew;
