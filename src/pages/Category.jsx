import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Context from "../context/Context";
import { getVideos } from "../context/Actions";
import Searchbar from "../components/Searchbar";
import Categories from "../components/Categories";
import Thumbnail from "../components/Thumbnail";
import Spinner from "../components/Spinner";

function Category() {
  const { item } = useParams();
  const { result, videos, dispatch } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const getVideosData = async () => {
      const videosData = await getVideos();
      dispatch({ type: "GET_VIDEOS", payload: videosData });
      setIsLoading(false)
    };

    getVideosData();
  }, [dispatch]);

  return (
    <>
      <Searchbar videos={videos}/>
      <Categories />
      <div className="container">

      {isLoading ? (<Spinner />) : (

        <>
        {result.length > 0 ? (
          result.map(
            (video) =>
              video.category.name === item && (
                <Link key={video.id} to={`/videos/${video.id}`}>
                  <Thumbnail
                    name={video.name.slice(0, 45)}
                    author={video.author}
                    length={video.length}
                    path={video.thumbnailName}
                  />
                </Link>
              )
          )
        ) : (
          videos.map(
            (video) =>
              video.category.name === item && (
                <Link key={video.id} to={`/videos/${video.id}`}>
                  <Thumbnail
                    name={video.name.slice(0, 45)}
                    author={video.author}
                    length={video.length}
                    path={video.thumbnailName}
                  />
                </Link>
              )
          )
        )}
        </>
      )}

        
      </div>
    </>
  );
}

export default Category;
