import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { MyRoutes } from "./routes/routes";

function App() {

  return (
    <div>
      <Header />
      <MyRoutes />
    </div>
  );
}

export default App;
