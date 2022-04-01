import { useState, useEffect, useContext } from "react";
import { getProfile, editProfile } from "../context/Actions";
import jwt_decode from "jwt-decode";
import Context from "../context/Context";
import Spinner from "./Spinner";
import "../styles/infos.css";

function Infos() {
  const { profile, loading, dispatch } = useContext(Context);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(""); 
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileUpdateData = await editProfile(username, first_name, last_name, email);
    dispatch({ type: "EDIT_PROFILE", payload: profileUpdateData });
    window.location.reload();
  }

  useEffect(() => {
    const getToken = () => {
      setToken(jwt_decode(localStorage.getItem("authToken")));
      setUsername(token.user_id);    
    }    

    const getProfileData = async () => {     
      if (username) {             
        try {
          dispatch({type: 'SET_LOADING'})
          const profileData = await getProfile(username);
          dispatch({ type: "GET_PROFILE", payload: profileData });
          setFirst_name(profile.first_name)
          setLast_name(profile.last_name)
          setEmail(profile.email)
        } catch (error) {
          console.log(error);
        }
      }
        
    }
    
    getToken()

    
    getProfileData()  
    
    
  }, [dispatch, username, token.user_id, profile.username, profile.first_name, profile.last_name, profile.email])
  return (

    
    <form className="user-form" action="" method="post" onSubmit={handleSubmit}>

            {loading && (<div className="loading-container"><Spinner /></div>)}

            <div className="user-name">
            <input type="text" name="first_name" id="first_name"  placeholder='First Name' defaultValue={first_name} onChange={(e) => {setFirst_name(e.target.value)}}/>
            <input type="text" name="last_name" id="last_name" placeholder='Last Name' defaultValue={last_name} onChange={(e) => {setLast_name(e.target.value)}}/>
            </div>
            <input type="email" name="email" id="email" placeholder="Email" defaultValue={email} onChange={(e) => {setEmail(e.target.value)}}/>           
            <button id="user-upload" type="submit">Confirm</button>
           
            
            
        </form>
  )
}

export default Infos