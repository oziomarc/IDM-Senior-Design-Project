import './App.css';
import Landing from './pages/Landing';
import Gallery from './pages/Gallery';
import {createBrowserRouter, RouterProvider} from "react-router-dom"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/gallery",
      element: <Gallery />
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
