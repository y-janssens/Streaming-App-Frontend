import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Context from "../context/Context";
import { getVideos } from "../context/Actions";
import Searchbar from "../components/Searchbar";
import Categories from "../components/Categories";
import Thumbnail from "../components/Thumbnail";

function Category() {
  const { item } = useParams();
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
      <Searchbar />
      <Categories />
      <div className="container">
        {videos.map(
          (video) =>
            video.category.name === item && (
              <Link key={video.id} to={`/videos/${video.id}`}>
                <Thumbnail
                  name={video.name.slice(0, 45)}
                  author={video.author}
                  length={video.length}
                  path={video.thumbnail}
                />
              </Link>
            )
        )}
      </div>
    </>
  );
}

export default Category;
