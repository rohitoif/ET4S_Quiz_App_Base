import React, { useEffect } from 'react';
import { useUser } from '../UserContext'; // Adjust path if needed
import { db } from '../firebaseConfig'; // Adjust path if needed
import { doc, getDoc } from 'firebase/firestore';


const messages = [
    // Motivational Messages
    "You're a star in the making! 🌟 Keep shining!",
    "Reach for the stars and you'll land on the moon! 🌙",
    "Every great astronaut started just like you! 🚀",
    "Believe in yourself – the universe is your playground! 🌌",
    "You're out of this world! 🌠 Keep exploring!",
    "Shoot for the moon, even if you miss, you'll land among the stars! 🌟",
    "Your curiosity is your rocket fuel! 🚀",
    "Great explorers never stop discovering! 🧭",
    "The sky is not the limit, your imagination is! 🌠",
    "Keep reaching higher, the universe awaits! 🌌",
    "Your potential is as limitless as the universe! ✨",
    "Stars can't shine without darkness – keep pushing through! 🌟",
    "You're a cosmic explorer in training! 🚀",
    "Every step you take is a giant leap for mankind! 👩‍🚀",
    "Keep looking up and reach for the stars! 🌠",
    "You're destined for greatness beyond the Milky Way! 🌌",
    "Don't stop exploring – the universe is vast and full of wonders! 🌌",
    "You're on a mission to discover the wonders of space! 🚀",
    "Just like stars, your dreams are limitless! ✨",
    "Keep dreaming big, future astronaut! 🚀",

    // Fun Facts
    "Did you know the sun is a star, just like the ones you see at night? ☀️",
    "Jupiter has a storm called the Great Red Spot that's bigger than Earth! 🌪️",
    "Venus is the hottest planet in our solar system! 🌡️",
    "A day on Venus is longer than a year on Venus! 🕰️",
    "Mars has the largest volcano in the solar system, Olympus Mons! 🌋",
    "There are more stars in the universe than grains of sand on all Earth's beaches! 🌌",
    "The Milky Way galaxy is home to our solar system! 🌌",
    "The moon has quakes, called moonquakes! 🌕",
    "There are over 200 moons in our solar system! 🌙",
    "Saturn's rings are made of ice and rock! 💍",
    "A year on Mercury is just 88 Earth days! 🕰️",
    "Uranus rotates on its side! 🔄",
    "Neptune has the fastest winds in the solar system! 💨",
    "There are mountains on Pluto! 🏔️",
    "The International Space Station orbits Earth about 16 times a day! 🌍",
    "Comets are made of ice, dust, and rock! ☄️",
    "Astronauts grow taller in space! 👨‍🚀",
    "Space is completely silent because there is no air to carry sound! 🤫",
    "The sun's light takes about 8 minutes to reach Earth! ☀️",
    "There are galaxies beyond our own that we can see with telescopes! 🔭",

    // Jokes
    "Why did the sun go to school? To get brighter! 😎",
    "How do you throw a space party? You planet! 🎉",
    "Why did the astronaut break up with his girlfriend? She needed space! 🚀",
    "What do you call a group of musical stars? A rock band! 🎸",
    "Why don't aliens visit our solar system? They read the reviews and it only had one star! ⭐",
    "How do you know when the moon has had enough to eat? When it's full! 🌕",
    "Why did the cow want to go to space? To see the Milky Way! 🐄",
    "What is an astronaut's favorite key on the keyboard? The space bar! ⌨️",
    "Why was the moon so broke? Because it was down to its last quarter! 🌓",
    "Why did the astronaut bring a pencil to space? To draw some space! ✏️",
    "How does the solar system hold up its pants? With an asteroid belt! 🥋",
    "Why did the alien go to school? To learn about the universe! 📚",
    "What do you call a star that can sing? A rock star! 🎤",
    "Why did the star go to school? To get a little brighter! ✨",
    "How does the man on the moon cut his hair? Eclipse it! ✂️",
    "Why did the astronaut take his computer to the doctor? It had a virus! 💻",
    "What kind of music do planets like? Neptunes! 🎶",
    "Why did Mars and Saturn get married? Because they had a ring! 💍",
    "What do you call a space magician? A flying saucerer! 🎩",
    "How do astronauts serve dinner? On flying saucers! 🍽️",
    "Why did the astronaut bring string to space? In case he wanted to tie up some loose ends! 🧵",
    "How do you know when the moon has enough to eat? When it's full! 🌕",
    "What is an astronaut’s favorite place on a computer? The space bar! ⌨️",
    "Why was the moon so happy? Because it was full! 😊",
    "How does the universe organize a party? They planet! 🎉",
    "Why did the astronaut break up with his girlfriend? She needed space! 🚀",
    "Why do astronauts use laptops? To stay on top of things! 💻",
    "What did Mars say to Saturn? Give me a ring sometime! 💍",
    "Why did the astronaut bring his cat to space? He wanted some purr-sonal space! 🐱",
    "Why don’t scientists trust atoms? Because they make up everything! 🤔"
];


const CosmicAchievements = () => {
  const { userId, username, setUsername, rank, setRank, xp, setXp, totalscore, setTotalscore, accuracy, setAccuracy } = useUser();
   const randomMessage = messages[Math.floor(Math.random() * messages.length)];
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
        setAccuracy(Math.floor(userData.accuracy));
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
      <h1 className="text-4xl font-bold mb-12">Your Past Missions</h1>
      
      <div className="flex justify-between w-full max-w-3xl mb-12">
        <AchievementCircle title="MARKS" icon={totalscore} color="bg-purple-700" />
        <AchievementCircle title="XP EARNED" icon={xp} color="bg-orange-500" />
        <AchievementCircle title="ACCURACY" icon={accuracyPercent} color="bg-purple-700" />
      </div>
      
      <div className="bg-purple-800 rounded-lg p-6 w-full max-w-3xl text-center">
        <button className="bg-pink-600 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full text-xl mb-4">
          Galaxy Giggles
        </button>
        <p className="text-xl">
          {randomMessage}
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

