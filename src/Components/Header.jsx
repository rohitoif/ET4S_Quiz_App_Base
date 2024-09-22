import React from "react";
import { useUser } from "../UserContext";

function Header() {
  const { username, rank } = useUser();

  return (
<header id="atthetop" className="flex justify-between items-center p-4 bg-purple-800">      
  <div className="flex-1 text-center" style={{ marginLeft: '300px' }}>
        <h1 className="text-3xl font-bold text-black">EduTech4Space Starfire Spaceship</h1>
      </div>
      <div className="flex flex-col items-end">
        <h1 className="mt-2 text-black" style={{marginRight:'10px'}}>Astronaut Name: {username}</h1>
        <h1 className="mt-2 text-black" style={{ marginBottom: '15px' , marginTop: '2px' , marginRight : '10px'}}>Astronaut Rank: {rank}</h1>
      </div>
    </header>
  );
}

export default Header;


