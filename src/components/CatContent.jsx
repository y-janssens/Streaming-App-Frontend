import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import { getCategories } from "../context/Actions";
import "../styles/content.css"

function CatContent() {
    const { categories, dispatch } = useContext(Context);
  
    useEffect(() => {
      const getCategoriesData = async() => {
          const categoriessData = await getCategories()
          dispatch({type: 'GET_CATEGORIES', payload: categoriessData})
        }
    
        getCategoriesData()
    }, [dispatch])
  return (
    <div className="content-container">
        <ul className="content-list">

          {categories.map((category) => (
            <li key={category.id} className="content-items">
              {category.name}
              <button className="content-items-crud"><Link to={`/confirm/category/${category.id}`} state= {{
                     name: category.name
                    }}>X</Link></button>
                </li>
      ))}
            
        </ul>
    </div>
  )
}

export default CatContent