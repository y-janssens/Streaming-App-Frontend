import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { getVideos } from "../context/Actions";
import Thumbnail from "../components/Thumbnail";
import Searchbar from "../components/Searchbar";
import Categories from "../components/Categories";
import Spinner from "../components/Spinner";
import '../styles/home.css'

function Home() {
  const { result, videos, dispatch } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVideosData = async() => {
        
          setIsLoading(true)
          const videosData = await getVideos()
          dispatch({type: 'GET_VIDEOS', payload: videosData})
          setIsLoading(false)
        
      }
  
      getVideosData()

  }, [dispatch])
  return (
    <>
    <Searchbar videos={videos}/>
    <Categories />

    <div className="container">

    {isLoading ? (<Spinner />) : (
      <>
          {result.length > 0 ? (

            result.map((video) => (
              <Link key={video.id} to={`videos/${video.id}`}>
                <Thumbnail 
                  name={video.name.slice(0,45)} 
                  author={video.author} 
                  path={video.thumbnailName}/>
              </Link>
            ))

        ) : (

            videos.map((video) => (
              <Link key={video.id} to={`videos/${video.id}`}>
                <Thumbnail 
                  name={video.name.slice(0,45)} 
                  author={video.author} 
                  path={video.thumbnailName}/>
              </Link>
            ))
        )}
      </>
    )}    
      </div>    
    </>
  );
}

export default Home;
