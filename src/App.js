import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./components/navbar";

import About from "./pages/About";
import heroBackground from "./images/hero-bg.jpg";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Shop from "./pages/Shop";
import Designs from "./pages/Designs";
import CreateDesign from "./pages/CreateDesign";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  return (
    <Router>
      <NextUIProvider>
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

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/designs"
                element={
                  <ProtectedRoute>
                    <Designs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreateDesign />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/adminDashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>
      </NextUIProvider>
    </Router>
  );
}

export default App;
