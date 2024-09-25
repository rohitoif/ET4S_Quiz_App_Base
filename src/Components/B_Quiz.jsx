import React from 'react';

const MissionPlanetHopper = ({ setQuizPage }) => {
  const handleQuizPage = () => {
    setQuizPage(4);
    //4 for MCQ
    //5 for DragNDrop
    //6 for Matching
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
            }}
          />
        ))}
      </div>
      
      <div className="w-full max-w-4xl bg-purple-800 bg-opacity-80 rounded-lg p-6 relative backdrop-filter backdrop-blur-sm shadow-2xl mb-20">

        <h1 className="text-4xl font-bold mb-6 text-center bg-pink-600 rounded-full px-6 py-2">Mission B</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow">
            <div className="bg-indigo-700 rounded-lg p-4 flex items-center mb-4 shadow-md">
              <span className="text-5xl mr-4">🚀</span>
              <div>
                <h2 className="text-2xl font-semibold text-orange-400">The Launch</h2>
                <p className="text-lg text-white">Learn about spaceships and start your Journey through the Cosmos</p>
              </div>
            </div>
            <button 
              onClick={handleQuizPage} 
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-full text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Start Mission!!
            </button>
            
          </div>

          <div className="md:w-2/5 flex flex-col">
            <div className="bg-pink-600 rounded-t-lg p-2 text-center font-bold text-xl text-white">
              Mission Details
            </div>
            <div className="bg-purple-700 rounded-b-lg p-4 shadow-inner flex-grow overflow-y-auto max-h-60 text-white">
              <p className="text-lg">
              In this mission we explore fascinating concepts like:
                <br /><br />
                • Launching rockets
                <br />
                • Getting back to Earth
                <br />
                • Safely navigating space
                <br />
                • Astronauts and how the travel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPlanetHopper;


