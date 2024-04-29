import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing";
import ContentMap from "./pages/ContentMap";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="mapa" element={<ContentMap />} />
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
