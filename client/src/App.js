import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/navbar";
import "./App.css";
import Home from "./pages/Home/Home";

function App() {
  const About = () => {
    return (
      <div>
        <h1>About</h1>
      </div>
    );
  };
  const Blog = () => {
    return (
      <div>
        <h1>Blog</h1>
      </div>
    );
  };
  const Contact = () => {
    return (
      <div>
        <h1>Contact Us</h1>
      </div>
    );
  };

  return (
    <div className="App">
      <NavBar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
