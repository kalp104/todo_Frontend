import React, { useState } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hero = ({ title, description, createdAt, fetchData }) => {
  const [tit, setTit] = useState("");

  const deleteData = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (tit) {
        response = await fetch(
          `http://localhost:5000/api/deleteTodo/${tit}`,
          { method: "DELETE" }
        );
      }

      if (!response.ok) {
        console.log("error while deleting data");
        toast.error("Not deleted");
      } 
      else{
        toast.success("we did it!!");
      fetchData();
      }
      
    } catch (e) {
      console.log("error", e);
      toast.error("todo is not checked!!");
    }
  };

  return (
    <>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-10 transition-all  group relative hover:scale-105  duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-800 ">
        <div className="flex items-center transition-all delay-300 ease-in-out">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-yellow-500">
            {title}
          </p>
          <form onSubmit={deleteData}>
            <button
              className="bg-yellow-500 text-blackh-7  ml-3 p-1 text-center rounded-md hidden group-hover:inline"
              onClick={() => {
                setTit(title);
              }}
            >
              <AiOutlineFileDone />
            </button>
          </form>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400 hover:text-blue-400">
          Date: {new Date(createdAt).toLocaleString().slice(0, 8)}
        </p>
        <p
          className="font-normal text-gray-700 dark:text-gray-200 hover:text-pink-500"
          style={{ whiteSpace: "pre-line" }}
        >
          {description.length > 25
            ? `${description.slice(0, 25)}\n${description.slice(25)}`
            : description}
        </p>
      </div>
    </>
  );
};

export default Hero;
