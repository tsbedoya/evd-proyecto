import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar";

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
  return (
    <>
      <Navbar />
      <main className="container-fluid">
        <Outlet />
      </main>
    </>
  );
}

export default App;
