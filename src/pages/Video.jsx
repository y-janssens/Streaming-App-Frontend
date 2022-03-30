import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Context from "../context/Context";
import { getVideo } from "../context/Actions";
import Spinner from "../components/Spinner";
import SubCategory from "./SubCategory";
import '../styles/video.css'

function Video() {
    const {id} = useParams()
    const { video, loading, dispatch } = useContext(Context);
  
    useEffect(() => {
        dispatch({type: 'SET_LOADING'})

      const getVideoData = async () => {
          const videoData = await getVideo(id)
          dispatch({type: 'GET_VIDEO', payload: videoData})

        }
    
        getVideoData()

    }, [dispatch, id])

    if (loading) {
        return <Spinner />
    }

  return (
    <div className="block-container">
    <div className="video-container">
        
        {video.file && (
          <>
          <video className="full-video" controls={true} preload="true" autoPlay={true}>
          <source src={`http://127.0.0.1:8000/static${video.file}`} />
          </video>
          
          <div className="video-title">
          <h3>{video.name}</h3>
          <p>{video.author}</p>
          </div>
          </>
        )}
        
</div>
 {video.category && ( <SubCategory category={video.category.name}/>)}
</div>
  )
}

export default Video