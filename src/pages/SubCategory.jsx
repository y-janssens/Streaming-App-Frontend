import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { getVideos } from "../context/Actions";
import Thumbnail from "../components/Thumbnail";
import "../styles/subcategories.css";

function Category({ category }) {
  const { videos, dispatch } = useContext(Context);

  useEffect(() => {
    const getVideosData = async () => {
      const videosData = await getVideos();
      dispatch({ type: "GET_VIDEOS", payload: videosData });
    };

    getVideosData();
  }, [dispatch]);

  return (
    <>
      <div className="sub-container">
        {videos.map(
          (video) =>
            video.category.name === category && (
              <Link key={video.id} to={`/videos/${video.id}`}>
                <Thumbnail
                  name={video.name.slice(0, 45)}
                  author={video.author}
                  length={video.length}
                  path={video.thumbnailName}
                />
              </Link>
            )
        )}
      </div>
    </>
  );
}

export default Category;
