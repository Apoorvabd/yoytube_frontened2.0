import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  // Navbar for a video sharing platform
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  if (!ctx) return null;
  return (
    <nav className="theme-card flex items-center justify-between p-4 animate-fade-up">
      
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/image.png" alt="Logo" className="h-12 w-28 object-contain" />
        {/* <span className="text-2xl font-bold text-indigo-500">नव्य ईक्षण</span> */}
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-4">
        {/* Link Style */}
        {["Home", "About", "Contact"].map((link) => (
          <li key={link}>
            <a
              href="#"
              className="px-3 py-1 rounded-md text-red-700 hover:text-white hover:bg-red-600 transition-colors duration-200 shadow-sm"
            >
              {link}
            </a>
          </li>
        ))}

        {/* Sign In Button */}
        <li>
          <Button variant="default" className="theme-accent px-4 py-2 shadow-md"
           onClick={()=>navigate("/Signup")}
          >
            Sign In
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
