import '../styles/confirm.css';
import { useContext } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Context from '../context/Context';
import { deleteVideo, deleteCategory } from '../context/Actions';

function Confirm(props) {
    const location = useLocation()
    const {item, id} = useParams();
    const navigate = useNavigate();
    const {name} = location.state;
    const { dispatch } = useContext(Context)
    
    const handleDelete = async () => {
        if (item === "video") {
        const itemData = await deleteVideo(id);
        dispatch({type: 'DELETE_VIDEO', payload: itemData});  
        } else if (item === "category") {
        const itemData = await deleteCategory(id);
        dispatch({type: 'DELETE_CATEGORY', payload: itemData});
        }      
        navigate('/account');        
    }; 

  return (
    <div id="prompt-container">
        
        <div id="prompt-text">Voulez-vous vraiment supprimer cet élément? 
            {item === "video" ? (
                <p><Link to={`/videos/${id}`}>{name.slice(0,50)}</Link></p>
            ) : item === "category" && (
                <p>{name.slice(0,50)}</p>
            )}            
        </div>
        
        <div id="prompt-grp">

            <button className="prompt-action" id="prompt-confirm" onClick={handleDelete}>Yes</button>  
            <button className="prompt-action" id="prompt-deny" onClick={() => navigate(-1)}>No</button>

        </div>
    </div>
  )
}

export default Confirm