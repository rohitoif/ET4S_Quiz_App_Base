import React from 'react';
function Hero() {
  return (
    //<div className="w-full flex justify-center items-center min-h-screen">
  <div className="container max-w-2xl p-8 bg-crea rounded-lg shadow-lg text-center hover:opacity-90">
    <h1 className="my-4 text-5xl font-bold">
      Welcome to ET4S <br />Space Station 🚀🚀!!
    </h1>
    <p className="text-2xl mb-8">
      ...lol we love making your life easier.
    </p>
    <div className="flex justify-center space-x-4">
      <button className="hover:underline bg-gray-800 text-white font-bold rounded-full py-4 px-8">
        Start Mission
      </button>
      <button className="hover:underline bg-gray-800 text-white font-bold rounded-full py-4 px-8">
        My Acheivements
      </button>
    </div>
  </div>
//</div>

  );
}

export default Hero;
