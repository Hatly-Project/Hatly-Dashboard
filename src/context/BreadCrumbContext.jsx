import { createContext, useState } from "react";

const BreadCrumbContext = createContext();
export const BreadCrumbProvider = ({ children }) => {
  const [endpoint, setEndpoint] = useState("");
  return (
    <BreadCrumbContext.Provider value={{ endpoint, setEndpoint }}>
      {children}
    </BreadCrumbContext.Provider>
  );
};
export default BreadCrumbContext;
