import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getToken, registerUser } from "../context/Actions";
import { toast } from "react-toastify";
import Context from "../context/Context";
import '../styles/login.css'

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const { dispatch } = useContext(Context);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
    const userData = await registerUser(username, password, password2, email, first_name, last_name)                        
    dispatch({type: 'REGISTER_USER', payload: userData})

    const token = await getToken(username, password);
    dispatch({ type: "GET_TOKEN", payload: token });
    localStorage.setItem("authToken", JSON.stringify(token.access));
    toast.success(`Welcome ${username}!`);  

    navigate('/');
    } catch (error) {
    toast.error('Please check your informations and complete all the fields')
    }
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    } 
    });

  return (
    <div className="login-container">
        <form className="login-form" onSubmit={onSubmit}>
            
            <input type="text" name="loginname" id="loginname" placeholder='Username'onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" name="password2" id="password2" placeholder="Password Confirmation" onChange={(e) => setPassword2(e.target.value)}/>
            <input type="email" name="email" id="email" placeholder="Email adress" onChange={(e) => setEmail(e.target.value)}/>     
            <input type="text" name="first_name" id="firstname" placeholder='First Name'onChange={(e) => setFirst_name(e.target.value)}/>
            <input type="text" name="last_name" id="lastname" placeholder='Last Name'onChange={(e) => setLast_name(e.target.value)}/>      
            <button id="login" type="submit">Register</button>  
            <Link className="register-link" to="/login">Login</Link>   
        </form>        
    </div>
  )
}

export default Register