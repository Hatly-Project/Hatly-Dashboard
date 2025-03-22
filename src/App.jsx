import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Login from "./Pages/Login/Login";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserDetails from "./Pages/UserDetails/UserDetails";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import Home from "./Pages/Home/Home";
import Users from "./Pages/Users/users";
import Trips from "./Pages/Trips/Trips";
import Shipments from "./Pages/Shipments/Shipments";
import Deals from "./Pages/Deals/Deals";
import { BreadCrumbProvider } from "./context/BreadCrumbContext";
import { CountriesProvider } from "./context/CountriesProvider";
import Layout from "./Pages/Layout/Layout";
function App() {
  const routes = createBrowserRouter([
    {path: "/", element: <Layout/>, children: [
      {path: "/", element: <Login/> , index: true},
      {
        path: "landingPage",
        element: <LandingPage />,
        children: [
          { path: "home", element: <Home /> },
          { path: "users", element: <Users /> },
          { path: "trips", element: <Trips /> },
          { path: "shipments", element: <Shipments /> },
          { path: "deals", element: <Deals /> },
          { path: "users/:id", element: <UserDetails /> },
        ],
      },
    ]},
   
  ]);
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
          <BreadCrumbProvider>
            <CountriesProvider>
              <RouterProvider router={routes} />
            </CountriesProvider>
          </BreadCrumbProvider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
