import { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import "../styles/searchbar.css";

function Searchbar({ videos }) {
  const { dispatch } = useContext(Context);
  const [queryset, setQueryset] = useState(null);

  useEffect(() => {
    let query = videos.filter(function (video) {
      return video.name.toLowerCase().includes(queryset?.toLowerCase());
    });

    dispatch({type: 'QUERY_SET', payload: query});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryset]);

  return (
    <div id="search_bar">
      <input id="search_bar_input" 
        type="text" 
        placeholder="Rechercher..." 
        onChange={(e) => setQueryset(e.target.value ? e.target.value : null)} />
    </div>
  );
}

export default Searchbar;
