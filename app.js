import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

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
const db = getFirestore(app);
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
        Swal.fire({
          icon: 'error',
          title: "Sorry",
          text: errorMessage
          
      })
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
let signUp_signIn = document.getElementById("signIN&signUPBtn");

ProfileBtn &&
  ProfileBtn.addEventListener("click", () => {
    console.log("profile");
    location.href = "profile.html";
  });

signUp_signIn &&
  signUp_signIn.addEventListener("click", () => {
    location.href = "signUp.html";
  });

let homepage = document.getElementById("homepage");
let blogtitle = document.getElementById("blogtitle");

homepage &&
  homepage.addEventListener("click", () => {
    location.href = "index.html";
  });

let postData = async () => {
  try {
    const docRef = await addDoc(collection(db, "blog"), {
      title: blogtitle.value,
      blog: blogtext.value,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

function deletetodo(id) {
  console.log(id);
}

let postBlog = document.getElementById("post-blog");

postBlog && postBlog.addEventListener("click", postData);
let mainDiv = document.getElementById("mainDiv");

const getblogs = () => {
  onSnapshot(collection(db, "blog"), (data) => {
    data.docChanges().forEach((change) => {
      console.log(change);
      const getBlogTitle = change.doc.data().title;
      const getBlogtex = change.doc.data().blog;
      mainDiv.innerHTML += `
<div class="card cardBlog text-center mt-5 justify-content-around">
          <h2 class="card-header background-color">Blog</h2>
          <div class="card-body">
          <img
          class="profile-img"
          src="121400813.png"
          alt=""
        />
            <h5 class="card-title blog-title">${getBlogTitle}</h5>
            <p class="profile-user-name">User Name : Muhammad Ahmed</p>
            <p class="card-text">
              ${getBlogtex}
            </p>
            <a href="#" class="btn btn-danger">Delete</a>
            <a href="#" class="btn button-bg">Edit</a>
          </div>
          
        </div>`;
        blogtitle.value = "";
        blogtext.value = "";
    });
  });
};

getblogs();
