import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdEMZWK7ZZXrFEvZY3vHSJjmki2A0-khA",
  authDomain: "herbalistapp-fe623.firebaseapp.com",
  projectId: "herbalistapp-fe623",
  storageBucket: "herbalistapp-fe623.appspot.com",
  messagingSenderId: "150872181101",
  appId: "1:150872181101:web:e19a3336b01452af24b264"
};

// IOS : 397825100171-0mb9mb62pcohglk6hp4pjji7cc37a76p.apps.googleusercontent.com
// ANDROID : 397825100171-9p6kou3elami72qv14rth458kh8jhoc5.apps.googleusercontent.com

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);