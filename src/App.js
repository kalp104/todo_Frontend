import React from "react";
import { useEffect, useState } from "react";
import Hero from "./components/Hero"
import AddingNew from "./components/AddingNew";
import './App.css';
function App() {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getTodo");
      if (!response.ok) {
        throw new Error(`Error in fetching data`);
      }
      const jsonformat = await response.json();
      const reversedData = jsonformat.data.slice().reverse();
      setData(reversedData);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  

  return (
    <div className="  bg-[#20464e] w-screen min-h-screen flex justify-center items-center  ">
      <div className="bg-[#1d3745]  w-[80%] max-h-[590px]  
      border-b-4 border-[#11212d] rounded-2xl shadow-2xl p-6 mb-6">
        <h1 className="text-[#b9e25a] text-center 
         font-bold text-4xl pt-3 font ">
                          Todos </h1>
        <div className="flex flex-row justify-between mt-2 bg-[#11212d] rounded-3xl transition-all duration-300 ease-in-out">
           <AddingNew fetchData={fetchData}/>
          <div className="w-full gap-6  max-h-[490px]  overflow-hidden overflow-y-scroll">
            <div className="flex flex-wrap px-2 py-3 gap-3">
              {data.map((item) => (
                <Hero
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  createdAt={item.createdAt}
                  fetchData={fetchData}
                ></Hero>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
