import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import Community from "../Pages/Community";
import Contact from "../Pages/Contact";
import Home from "../pages/Home";
import Subscription from "../pages/Subscription";
import Profile from "../pages/Profile";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About/>} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
        <Route
  path="/subscription"
  element={<Subscription />}
/>
<Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;