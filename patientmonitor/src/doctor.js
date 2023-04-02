import { Navbar } from "./navbar";
import { database } from "./firebase";
import { ref, onValue, child, get } from "firebase/database";
import React from "react";

export function Doctor() {
  const [imgSrc, setImgSrc] = React.useState(null);

  const d = new Date();
  let time = d.getTime();
  
  


  React.useEffect(() => {
    const interval = setInterval(() => {
      get(child(ref(database), "images/new")).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setImgSrc(data.image);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <Navbar />
      <p>Doctor</p>
      {imgSrc && (
        <img
          src={imgSrc}
        />
      )}
    </div>
  );
}
