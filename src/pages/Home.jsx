import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { getVideos } from "../context/Actions";
import Thumbnail from "../components/Thumbnail";
import Searchbar from "../components/Searchbar";
import Categories from "../components/Categories";
import '../styles/home.css'

function Home() {
  const { videos, dispatch } = useContext(Context);

  useEffect(() => {
    const getVideosData = async() => {
        const videosData = await getVideos()
        dispatch({type: 'GET_VIDEOS', payload: videosData})
      }
  
      getVideosData()
  }, [dispatch])
  return (
    <>
    <Searchbar />
    <Categories />

    <div className="container">
      
      {videos.map((video) => (
        <Link key={video.id} to={`videos/${video.id}`}><Thumbnail name={video.name.slice(0,45)} author={video.author} length={video.length} path={video.thumbnail}/></Link>
      ))}
      </div>
    
    </>
  );
}

export default Home;
