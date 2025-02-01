import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./user.css"
import Switch from "@mui/material/Switch";

const User = ({ user, isLoading, setChartKey }) => {
    const[userData, setUserData] = useState(null)
    
    const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ? true : false  
  );

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark();  
    } else {
      setLight(); 
    }
  }, []);

  const changeMode = () => {
    if (darkMode) {
      setLight();  
    } else {
      setDark();   
    }
    setDarkMode(!darkMode); 

    setChartKey(prevKey => prevKey + 1);
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

    
function getGreeting() {
  const now = new Date();
  const hours = now.getHours(); 
  const morning =  (
      <span className="greeting">
        <img src="/morning.png" alt="Morning" />
        Good Morning
      </span>
    );
  const afternoon =  (
      <span className="greeting">
        <img src="/sun.png" alt="Morning" />
        Good Afternoon
      </span>
    );
  const evening =  (
      <span className="greeting">
        <img src="/evening.png" alt="Morning" />
        Good Evening
      </span>
    );
  const night =  (
      <span className="greeting">
        <img src="/night.png" alt="Morning" />
        Good Night
      </span>
    );

  if (hours >= 5 && hours < 12) {
    return morning;
  } else if (hours >= 12 && hours < 17) {
    return afternoon
  } else if (hours >= 17 && hours < 21) {
    return evening;
  } else {
    return night;
  }
}

useEffect(() => {
  if (user && !isLoading) {
    fetchUserData();
  }
}, [user, isLoading]);


  const fetchUserData = async () => {
    try {
      if (user) {
        const userDocRef = doc(db, `users/${user.uid}`); // Assuming the data is stored in Firestore
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            setUserData(docSnap.data()); // Store user data in state
        } else {
          console.log('No such document!');
        }
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    } finally {
    }
  };

  if (isLoading) {
    return null; // Render nothing while loading
  }
    
  return (
    <div className="profile">
      {userData && (
        <div className="greetings">
          <h2>{getGreeting()}, <span>{userData.name ? userData.name.split(' ')[0] : "Guest"} !</span></h2>
        </div>
      )}
      <Switch checked={darkMode} onClick={() => changeMode()} />
    </div>
  );
};

export default User; 

