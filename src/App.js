import './App.css';
import Landing from './pages/Landing';
import Gallery from './pages/Gallery';
import Booth from './pages/Booth';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAbaPabQkl9fmo8yHUmCtek7KowWK1AWsU",
  authDomain: "photobooth-7ee4c.firebaseapp.com",
  projectId: "photobooth-7ee4c",
  storageBucket: "photobooth-7ee4c.appspot.com",
  messagingSenderId: "343204330461",
  appId: "1:343204330461:web:398d0e337c44bec2cf9434"
};

function App() {

  // const [appInitialized, setAppInitialized] = useState();
  // const [userCaption, setUserCaption] = useState({});

  // useEffect(() => {
  //   const app = initializeApp(firebaseConfig);
  //   setAppInitialized(true)
  // },[]) 

  // useEffect(() => {
  //   if (appInitialized) {
  //     const auth = getAuth()
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         setUserInfo(user)
  //         setIsLoggedIn(true)
  //       } else {
  //         setUserInfo({})
  //         setIsLoggedIn(false)
  //       }
  //       setIsLoading(false)
  //     });
  //   }
  // }, [appInitialized]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/gallery",
      element: <Gallery />
    },
    {
      path: "/booth",
      element: <Booth />
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
