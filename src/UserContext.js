// src/UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [xp, setXp] = useState(null);
  const [rank,setRank]=useState(null);
  const [totalscore, setTotalscore] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId , username , setUsername , xp , setXp , totalscore , setTotalscore , rank, setRank}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
