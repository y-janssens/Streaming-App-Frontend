import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Context from "../context/Context";
import { uploadVideo, uploadThumbnail } from "../context/Actions";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import '../styles/upload.css';
import '../styles/loading.css';

function Gitupload() {
    const navigate = useNavigate();
    const { dispatch } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null)
    const [ file, setFile ] = useState(null)
    const [ fileName, setFileName ] = useState(null)
    const uploadData = new FormData();

    const encodeFile = (e) => {
      const target = e.target.files[0];
      setFileName(target.name);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');

            setFile(base64String);
        };
        reader.readAsDataURL(target);      
    }

    const handleUpload = async (e) => {
        e.preventDefault();
            setIsLoading(true)
        
            const fileData = await uploadVideo(message, file, fileName)                        
            dispatch({type: 'UPLOAD_FILE', payload: fileData})
            toast.success('Content successfully uploaded!')            
            navigate('/');
               
    }

  return (
    <div className='form-container'>
        
        <form className="upload-form" method="post" onSubmit={handleUpload}>

            {isLoading && (<div className="loading-container"><Spinner /></div>)}

            <input type="text" name="message" id="message" placeholder='message' onChange={(e) => setMessage(e.target.value)}/>


            <div className="file-input">
            <input type="file" className="file" id="file2" onChange={encodeFile}/>
            <label htmlFor="file2">File</label> 
            <button id="upload" type="submit">Upload</button>
            </div>
            
            
        </form>

    </div>
  )
}

export default Gitupload