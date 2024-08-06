import React, { useEffect } from 'react';
import { useUser } from '../UserContext'; // Adjust path if needed
import { db } from '../firebaseConfig'; // Adjust path if needed
import { doc, getDoc } from 'firebase/firestore';

const CosmicAchievements = () => {
  const { userId, username, setUsername, rank, setRank, xp, setXp, totalscore, setTotalscore, accuracy, setAccuracy } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, 'et4s_main', userId); // Document ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUsername(userData.name);
        setRank(userData.rank);
        setXp(userData.xp);
        setTotalscore(userData.totalscore);
        setAccuracy(userData.accuracy);
      } else {
        console.log('Cannot Find User!');
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, setUsername, setRank, setXp, setTotalscore, setAccuracy]);

  const accuracyPercent = `${accuracy}%`;

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-12"> YOUR COSMIC ACHIEVEMENTS 🚀🚀</h1>
      
      <div className="flex justify-between w-full max-w-3xl mb-12">
        <AchievementCircle title="MARKS" icon={totalscore} color="bg-purple-700" />
        <AchievementCircle title="XP EARNED" icon={xp} color="bg-orange-500" />
        <AchievementCircle title="ACCURACY" icon={accuracyPercent} color="bg-purple-700" />
      </div>
      
      <div className="bg-purple-800 rounded-lg p-6 w-full max-w-3xl text-center">
        <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full text-xl mb-4">
          YOUR JOURNEY
        </button>
        <p className="text-xl">
          The next mission awaits your attention, Commander. Giddy up !! 🫡🫡
        </p>
      </div>
    </div>
  );
};

const AchievementCircle = ({ title, icon, color }) => {
  return (
    <div className={`${color} w-32 h-32 flex flex-col items-center justify-center hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full text-xl mb-4`}>
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-semibold">{title}</span>
    </div>
  );
};

export default CosmicAchievements;

