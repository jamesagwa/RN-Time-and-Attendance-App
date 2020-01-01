import React, { useState, useMemo, useContext } from "react";

const AppContext = React.createContext();

function AppProvider(props) {
  const [geo, setGeo] = useState({});
  const value = useMemo(() => [geo, setGeo], [geo]);
  return <AppContext.Provider value={value} {...props} />;
}

function useAppContext() {
  // what's cool about this approach is that we could put all the logic for common ways to update the state in our useContext hook:
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(`useAppContext must be used within a AppProvider`);
  }
  const [geo, setGeo] = context;
  //   const increment = () => setGeo(c => c + 1);

  return {
    geo,
    setGeo
  };
}

export { AppProvider, useAppContext };
