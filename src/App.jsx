import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Login from "./Pages/Login/Login";
import Loading from "./Componente/Loading/Loading";

function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <Login />
       
      </QueryClientProvider>
    </>
  );
}

export default App;
