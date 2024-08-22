import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";

import About from "./pages/About";
import heroBackground from "./images/hero-bg.jpg";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Shop from "./pages/Shop";

function App() {
  return (
    <Router>
      <main
        className="w-screen max-w-[2560px] mx-auto min-h-[100vh] bg-gray-500 bg-blend-multiply"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Navbar />
        <div className="mt-[108px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
