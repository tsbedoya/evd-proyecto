import { Routes, Route } from "react-router-dom"
import Landing from "./pages/landing";
import ContentMap from "./pages/ContentMap";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Landing/> } />
        <Route path="Mapa" element={ <ContentMap/> } />
      </Routes>
    </div>
  );
}

export default App;
