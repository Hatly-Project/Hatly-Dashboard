import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Login from "./Pages/Login/Login";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetails from "./Pages/UserDetails/UserDetails";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

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
  <Provider store={store}>
  <QueryClientProvider client={new QueryClient()}>
    <RouterProvider router={routes} />
  </QueryClientProvider>
  </Provider>
  </>
}

export default App;
