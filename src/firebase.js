import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBAsKOqzyWJ7ljqpuk32G0223Df41N9-8w",
  authDomain: "chatapp-8a56f.firebaseapp.com",
  databaseURL: "https://chatapp-8a56f-default-rtdb.firebaseio.com",
  projectId: "chatapp-8a56f",
  storageBucket: "chatapp-8a56f.appspot.com",
  messagingSenderId: "1026651641444",
  appId: "1:1026651641444:web:aa16beb5af2119ed013171"
};

const app = initializeApp(firebaseConfig);
export default  getDatabase(app);

