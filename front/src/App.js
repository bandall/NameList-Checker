import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navibar from "./Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
      <Navibar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
