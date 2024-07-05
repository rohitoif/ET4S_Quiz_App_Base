import React from 'react';
function Hero() {
  return (
    <div className="w-screen h-screen text-white ">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col float-left hover:underline">
        
        <div className="text-center lg:w-5/12 w-full">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            An app to help kids manage their tasks and homeworks.. 
          </h1>
          <p className="text-2xl mb-8" >
          .. lol we love making your life easier.          </p>
          <div className="flex justify-center mx-auto">
            <button
              className="hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8 btn">
              View Projects
            </button>
            <button
              className="ml-4 hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8 btn">
              Plugins
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
