import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/home";
import Tournament from "./pages/tournament";
import Departure from "./pages/departure";
import History from "./pages/history";
import Events from "./pages/event";

function App() {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/tournaments",
      element: <Tournament />,
    },
    {
      path: "/departures",
      element: <Departure />,
    },
    {
      path: "/history",
      element: <History />,
    },
    {
      path: "/events",
      element: <Events />,
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
