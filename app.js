import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore , collection, addDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
const db = getFirestore(app);

const firebaseConfig = {
  apiKey: "AIzaSyDRdwI7MsBM7-ktK4A45FduIptdNMXYnak",
  authDomain: "hackathon-4aceb.firebaseapp.com",
  projectId: "hackathon-4aceb",
  storageBucket: "hackathon-4aceb.appspot.com",
  messagingSenderId: "483540791511",
  appId: "1:483540791511:web:2ad5a43a848af8e67f0092",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let signUpEmail = document.getElementById("signUpEmail");
let signUpPassword = document.getElementById("signUpPassword");
let signUpBtn = document.getElementById("signUpBtn");

signUpBtn &&
  signUpBtn.addEventListener("click", () => {
    createUserWithEmailAndPassword(
      auth,
      signUpEmail.value,
      signUpPassword.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("done", user);
        location.href = "signin.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });

let signInEmail = document.getElementById("signInEmail");
let signInPassword = document.getElementById("signInPassword");
let signInBtn = document.getElementById("signInBtn");

signInBtn &&
  signInBtn.addEventListener("click", () => {
    signInWithEmailAndPassword(auth, signInEmail.value, signInPassword.value)
      .then((userCredential) => {
        console.log("done");
        const user = userCredential.user;
        location.href = "index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });

let ProfileBtn = document.getElementById("ProfileBtn");
let signUp_signIn = document.getElementById("signIN&signUPBtn")

ProfileBtn && ProfileBtn.addEventListener("click", () => {
  console.log("profile")
 location.href = "profile.html"
});

signUp_signIn && signUp_signIn.addEventListener("click" , () => {
  location.href = "signUp.html"
})



let homepage = document.getElementById("homepage");

homepage && homepage.addEventListener("click" , () => {
  location.href = "index.html"
})

let  postData = async()=>{

  try {
    const docRef = await addDoc(collection(db, "blog"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}






let postBlog = document.getElementById("post-blog")


// postBlog.addEventListener("click" )












