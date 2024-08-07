import React from 'react';
import {useUser} from '../UserContext'
function Hero({handleChangePage}) {
  const { username } = useUser();
  function changeQuizPage(){
    handleChangePage(1);
  }

  function changeAcheivementsPage() {
    handleChangePage(2);
  }
  return (
    //<div className="w-full flex justify-center items-center min-h-screen">
  <div className="container max-w-2xl p-8 bg-crea rounded-lg shadow-lg text-center hover:opacity-90">
    <h1 className="my-4 text-5xl font-bold text-black">
      Welcome to ET4S <br />Space Station 🚀🚀!!
    </h1>
    <p className="text-2xl mb-8">
      <b>Heyy {username}... Ready to dive in on a new space mission ?? 🤓</b>
    </p>
    <div className="flex justify-center space-x-4">
      <button className="hover:underline bg-gray-800 text-white font-bold rounded-full py-4 px-8" onClick={changeQuizPage}>
        Start Mission
      </button>
      <button className="hover:underline bg-gray-800 text-white font-bold rounded-full py-4 px-8" onClick={changeAcheivementsPage}>
        My Acheivements
      </button>
    </div>
  </div>
//</div>

  );
}

export default Hero;
