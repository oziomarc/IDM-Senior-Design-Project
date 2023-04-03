import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAbaPabQkl9fmo8yHUmCtek7KowWK1AWsU",
    authDomain: "photobooth-7ee4c.firebaseapp.com",
    projectId: "photobooth-7ee4c",
    storageBucket: "photobooth-7ee4c.appspot.com",
    messagingSenderId: "343204330461",
    appId: "1:343204330461:web:398d0e337c44bec2cf9434"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export allows you to have access to the stroage from anywhere in the project
export const storage = getStorage(app)