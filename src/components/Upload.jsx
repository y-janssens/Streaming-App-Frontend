import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Context from "../context/Context";
import { getCategories, addVideo } from "../context/Actions";
import '../styles/upload.css';

function Upload() {
    const navigate = useNavigate();
    const { categories, dispatch } = useContext(Context);
    const [active, setActive] = useState(true)
    const [name, setName] = useState(null)
    const [author, setAuthor] = useState(null)
    const [category, setCategory] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedThumbnail, setSelectedThumbnail] = useState(null)
    const uploadData = new FormData();

    const handlePost = async (e) => {
        e.preventDefault();
        uploadData.append('file' , selectedFile)
        uploadData.append('thumbnail' , selectedThumbnail)
        uploadData.append('name', name)
        uploadData.append('author', author)
        uploadData.append('category', category)

        if (selectedFile && selectedThumbnail && name && author && category !== null) {
            const videoData = await addVideo(uploadData)
            dispatch({type: 'POST_VIDEO', payload: videoData})
            navigate('/');
        }
        
    }
  
    useEffect(() => {
      const getCategoriesData = async() => {
          const categoriessData = await getCategories()
          dispatch({type: 'GET_CATEGORIES', payload: categoriessData})
        }
    
        getCategoriesData()
    }, [dispatch])
  return (
    <div className='form-container'>
        
        <form className="upload-form" action="" method="post" onSubmit={handlePost}>
            <input type="text" name="name" id="name" placeholder='name' onChange={(e) => setName(e.target.value)}/>
            <input type="text" name="author" id="author" placeholder='author' onChange={(e) => setAuthor(e.target.value)}/>

            <div className="categories-grp">    
            <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
		<option value="empty">Category</option>
                {categories.map((cat) => (
                    <option key={cat.id}>{cat.name}</option>
                ))}
            </select>
            {active === false ? (
                <input type="text" name="ncategory" id="ncategory" disabled={true} placeholder='Category'/>
            ) : (
                <input type="text" name="ncategory" id="ncategory" placeholder='New category' onChange={(e) => setCategory(e.target.value)}/>
            )}
            </div>
            <div className="file-input">
            <input type="file" className="file" id="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
            <label htmlFor="file">File</label>
            <input type="file" className="thumbnail" id="thumbnail" onChange={(e) => setSelectedThumbnail(e.target.files[0])}/>
            <label htmlFor="thumbnail">Thumbnail</label>
            <button id="upload" type="submit">Upload</button>
            </div>
            
            
        </form>

    </div>
  )
}

export default Upload