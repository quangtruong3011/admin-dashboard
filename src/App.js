import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Router from "./routers";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;