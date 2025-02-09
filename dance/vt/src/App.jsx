import { Routes, Route } from "react-router-dom";
import { MainWithSidebar } from "./components/NavbarNew";
import SkillSharePage from "./components/SkillSharePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";
import SideBar from "./components/Sidebar";
import Instructors from "./pages/Instructors";

function App() {
  return (
    <>
      <Navbar />
      
        <SideBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainWithSidebar />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/skill" element={<SkillSharePage />} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
