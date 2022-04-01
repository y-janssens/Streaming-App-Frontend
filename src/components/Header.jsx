import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import '../styles/header.css'

function Header() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const checkStatus = async () => {
      if (token) {
        setIsLogged(true);
      }
    };
    checkStatus();
  }, [isLogged, token]);

  const logout = () => {
    if (localStorage.getItem("authToken")) {
      localStorage.removeItem("authToken");
      setIsLogged(false);
      toast('Goodbye!');
      navigate("/login");
    }
  };

  return (
    <div className='header'>
      <div className="header-app-title">Streaming App</div>

        <div className="header-title">
          <div className="header-btns-grp">
          <button className="header-btn" id="home"><Link to="">Home</Link></button>
          {isLogged && ( <button className="header-btn"><Link to="account/">Profile</Link></button>)}
          </div>
          {isLogged ? (<button className="header-btn" id="logout" onClick={logout}>Logout</button>) : (
            <button className="header-btn" id="home"><Link to="/login">Login</Link></button>
          )}
        </div>

    </div>
  )
}

export default Header