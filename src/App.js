import './App.css';
import Landing from './pages/Landing';
import Gallery from './pages/Gallery';
import Booth from './pages/Booth';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {initializeApp} from "firebase/app"
import { getStorage } from "firebase/storage";
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
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadSuccessful, setUploadSuccessful] = useState(false)
  const [appInitialized, setAppInitialized] = useState();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAppInitialized(true)
  },[]) 

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
      element: <Landing 
      app={appInitialized}
      />
    },
    {
      path: "/gallery",
      element: <Gallery 
      app={appInitialized}
      />
      
    },
    {
      path: "/booth",
      element: <Booth 
      app={appInitialized}
      capturedImage={capturedImage}
      setCapturedImage={setCapturedImage}
      uploadSuccessful={uploadSuccessful}
      setUploadSuccessful={setUploadSuccessful}
      />
    },
    {
      path: "/save-image",
      element: <saveImage />
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
