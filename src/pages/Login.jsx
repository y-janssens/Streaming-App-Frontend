import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "../context/Actions";
import Context from "../context/Context";
import '../styles/login.css'

function Login() {
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      const getTokenAccess = async () => {
        const token = await getToken(username, password);

        try {
          dispatch({ type: "GET_TOKEN", payload: token });
          localStorage.setItem("authToken", JSON.stringify(token.access));
          navigate("/");
        } catch (error) {
          console.log(error);          
        }
      };

      getTokenAccess();
      setAccess(false);
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, access]);
  
  return (
    <div className="login-container">
        <form className="login-form" onSubmit={onSubmit}>
            
            <input type="text" name="loginname" id="loginname" placeholder='Username'onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" name="password" id="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)}/>           
            <button id="login" type="submit">Login</button>  
            <Link className="register-link" to="/register">Register</Link>   
        </form>        
    </div>
  )
}

export default Login