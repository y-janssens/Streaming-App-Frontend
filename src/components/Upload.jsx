import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Context from "../context/Context";
import { getCategories, addVideo, uploadVideo, uploadThumbnail } from "../context/Actions";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import File from "./File";
import '../styles/upload.css';
import '../styles/loading.css';

function Upload() {
    const navigate = useNavigate();
    const { categories, dispatch } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(null)
    const [author, setAuthor] = useState(null)
    const [category, setCategory] = useState(null)
    const [message, setMessage] = useState(null)

    const [uploadFile, setUploadFile] = useState(null)
    const [uploadThumbnailFile, setuploadThumbnailFile] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedFileName, setSelectedFileName] = useState(null)

    const [selectedThumbnail, setSelectedThumbnail] = useState(null)
    const [selectedThumbnailName, setSelectedThumbnailName] = useState(null)

    const maxSize = 20000000; // 20Mb

    const encodeFile = (e) => {
        const target = e.target.files[0];
        setUploadFile(target);
        setSelectedFileName(target.name);
        setMessage(`Upload ${target.name}`)
  
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result
                  .replace('data:', '')
                  .replace(/^.+,/, '');
  
                  setSelectedFile(base64String);
          };
          reader.readAsDataURL(target);      
      }

      const encodeThumbnail = (e) => {
        const target = e.target.files[0];
        setuploadThumbnailFile(target);
        setSelectedThumbnailName(target.name);
        setMessage(`Upload ${target.name}`)
  
          const reader = new FileReader();
          reader.onloadend = () => {
              const base64String = reader.result
                  .replace('data:', '')
                  .replace(/^.+,/, '');
  
                  setSelectedThumbnail(base64String);
          };
          reader.readAsDataURL(target);      
      }

    const handlePost = async (e) => {
        e.preventDefault();

        if (uploadFile.size <= maxSize ) {

            if (selectedFile && selectedThumbnail && name && author && category !== null) {      

                try {
                
                setIsLoading(true)

                const videoData = await addVideo(name, author, category, selectedFileName, selectedThumbnailName)                        
                dispatch({type: 'POST_VIDEO', payload: videoData})                
                
                const fileData = await uploadVideo(message, selectedFile, selectedFileName)                        
                dispatch({type: 'UPLOAD_VIDEO', payload: fileData})

                const thumbnailData = await uploadThumbnail(message, selectedThumbnail, selectedThumbnailName)                        
                dispatch({type: 'UPLOAD_THUMB', payload: thumbnailData})


                toast.success('Content successfully uploaded!')            
                navigate('/');

                } catch (error) {
                    setIsLoading(false)
                }
            } 

        } else {
            toast.error('File is too large, maximum size allowed: 20Mo')
        }
    }
  
    useEffect(() => {        
        
      const getCategoriesData = async() => {
          const categoriessData = await getCategories()
          dispatch({type: 'GET_CATEGORIES', payload: categoriessData})
        }
    
        getCategoriesData()
    }, [dispatch, isLoading])

  return (
    <div className='form-container'>
        
        <form className="upload-form" encType="multipart/form-data" method="post" onSubmit={handlePost}>

            {isLoading && (<div className="loading-container"><Spinner /></div>)}

            <input type="text" name="name" id="name" placeholder='name' onChange={(e) => setName(e.target.value)}/>
            <input type="text" name="author" id="author" placeholder='author' onChange={(e) => setAuthor(e.target.value)}/>

            <div className="categories-grp">   

                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="empty">Category</option>

                        {categories.map((cat) => (
                            <option key={cat.id}>{cat.name}</option>
                        ))}

                </select>

            <input type="text" name="ncategory" id="ncategory" placeholder='New category' onChange={(e) => setCategory(e.target.value)}/>

            </div>
            <div className="file-input">

                <input type="file" className="file" id="file" onChange={encodeFile}/>
                    <label htmlFor="file">File</label>

                <input type="file" className="thumbnail" id="thumbnail" onChange={encodeThumbnail}/>
                    <label htmlFor="thumbnail">Thumbnail</label>

                <button id="upload" type="submit">Upload</button>
            </div>

       
                <File anchor={uploadFile} name={selectedFileName} reset={setUploadFile}/>             
                <File anchor={uploadThumbnailFile} name={selectedThumbnailName} reset={setuploadThumbnailFile}/>
       
            
            
        </form>

    </div>
  )
}

export default Upload