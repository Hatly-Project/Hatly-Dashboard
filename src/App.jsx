import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Login from "./Pages/Login/Login";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetails from "./Pages/UserDetails/UserDetails";

function App() {

  const routes = createBrowserRouter([
    {
      path: "/",element:<Login/>
    },
    {
      path: "LandingPage",element:<LandingPage/>
    },
    {
      path: "user/:id",element:<UserDetails/>
    }
  ])
  return <>
  <QueryClientProvider client={new QueryClient()}>
    <RouterProvider router={routes} />
  </QueryClientProvider>
  </>
}

export default App;
