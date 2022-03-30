import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "../context/Actions";
import Context from "../context/Context";
import '../styles/login.css'

function Register() {
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { dispatch } = useContext(Context);

  const onSubmit = (e) => {
    e.preventDefault();
    setAccess(true);
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    } 

    if (access) {
      console.log('test');      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, access]);
  return (
    <div className="login-container">
        <form className="login-form" onSubmit={onSubmit}>
            
            <input type="text" name="loginname" id="loginname" placeholder='Username'onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" name="password" id="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)}/>
            <input type="email" name="email" id="email" placeholder="Email adress" onChange={(e) => setEmail(e.target.value)}/>           
            <button id="login" type="submit">Register</button>  
            <Link className="register-link" to="/login">Login</Link>   
        </form>        
    </div>
  )
}

export default Register