import React from 'react';

const MissionPlanetHopper = (props) => {
  function handleQuizPage(){
    props.setQuizPage(2);
    //0 for MCQ
    //1 for DragNDrop
    //2 for Matching
  };

  return (
    <div className= "min-h-screen text-white flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-purple-800 rounded-lg p-6 relative">
        <div className="absolute -top-6 left-0 right-0 text-center">
          <span className="bg-purple-700 px-4 py-2 rounded-full text-lg font-semibold">
            ALL THE BEST .. RANGER !!
          </span>
        </div>

        <div className="flex mt-4">
          <div className="flex-grow mr-4">
            <h1 className="text-3xl font-bold mb-4">Mission Planet Hopper</h1>
            <div className="bg-purple-700 rounded-lg p-4 flex items-center">
              <span className="text-4xl mr-4">🐕</span>
              <div>
                <h2 className="text-xl font-semibold text-orange-400">Commander Doggo</h2>
                <p>Explore all planets b4 time runs out</p>
              </div>
            </div>
            <button onClick={handleQuizPage} className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full text-xl">
              Mission is a GO!! 
            </button>
          </div>

          <div className="w-1/3">
            <div className="bg-red-500 rounded-t-lg p-2 text-center font-bold">
              MISSION STATISTICS
            </div>
            <div className="bg-purple-600 rounded-b-lg p-4">
              <p>
                In this mission we explore concepts like : Big Bang , The expansion of the Universe , Formation of galaxies and MORE ... !!! READY UR GEARS !!!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPlanetHopper;


