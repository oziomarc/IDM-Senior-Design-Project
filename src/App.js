import './App.css';
import Landing from './pages/Landing';
import Gallery from './pages/Gallery';
import Booth from './pages/Booth';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
// import { useEffect, useState } from "react";
// import {initializeApp} from "firebase/app"
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const firebaseConfig = {
// };

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
