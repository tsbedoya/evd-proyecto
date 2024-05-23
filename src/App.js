import { createContext, useState } from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar";

export const AppContext = createContext("");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mapa" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  const [estacionesMetroCercanas, setEstacionesMetroCercanas] = useState([]);

  return (
    <AppContext.Provider value={{ estacionesMetroCercanas, setEstacionesMetroCercanas }}>
      <Navbar />
      <main className="container-fluid">
        <Outlet />
      </main>
    </AppContext.Provider>
  );
}

export default App;
