import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { getVideos } from "../context/Actions";
import "../styles/content.css"

function Content() {
  const { videos, dispatch } = useContext(Context);

  useEffect(() => {
    const getVideosData = async() => {
        const videosData = await getVideos()
        dispatch({type: 'GET_VIDEOS', payload: videosData})
      }
  
      getVideosData()
  }, [dispatch])
  return (
    <div className="content-container">
        <ul className="content-list">
        
          {videos.map((video) => (
            <li key={video.id} className="content-items">
              <Link to="">{video.name.slice(0,60)}</Link>
               <button className="content-items-crud"><Link to={`/confirm/video/${video.id}`} state= {{
                     name: video.name
                    }}>X</Link></button>
                </li>
      ))}
            
        </ul>
    </div>
  )
}

export default Content