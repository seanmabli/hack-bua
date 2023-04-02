import { Navbar } from "./navbar";
import { database } from "./firebase";
import { ref, child, get } from "firebase/database";
import React from "react";

export function Doctor() {
  const [imgSrc, setImgSrc] = React.useState(null);
  let patientHelp = false;
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
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div class="videoContainerDoctor">
        <div>
        <p class='cam-txt-doctor'>Patient's Video Stream</p>
          {imgSrc && (
            <img class="cam-feed"
              src={imgSrc}
            />
          )}
        </div>
        <div>
          <div>
            <p class="patient">Patient data</p>
            <ul>
              <li class="patientInfo" >Patient is Fine</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
