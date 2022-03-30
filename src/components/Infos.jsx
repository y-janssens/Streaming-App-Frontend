import "../styles/infos.css";

function Infos() {
  return (
    <form className="user-form" action="" method="post">
            <div className="user-name">
            <input type="text" name="first_name" id="first_name" placeholder='First Name'/>
            <input type="text" name="last_name" id="last_name" placeholder='Last Name'/>
            </div>
            <input type="text" name="username" id="username" placeholder='Username'/>
            <input type="email" name="email" id="email" placeholder="Email"/>           
            <button id="user-upload" type="submit">Confirm</button>
           
            
            
        </form>
  )
}

export default Infos