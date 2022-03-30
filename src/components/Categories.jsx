import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Context from "../context/Context";
import { getCategories } from "../context/Actions";
import '../styles/categories.css';

function Categories() {
    const { categories, dispatch } = useContext(Context);
    const {item} = useParams();
  
    useEffect(() => {
      const getCategoriesData = async() => {
          const categoriessData = await getCategories()
          dispatch({type: 'GET_CATEGORIES', payload: categoriessData})
        }
    
        getCategoriesData()
    }, [dispatch])
    
  return (
    <div className='category-container'>

    {categories.map((category) => (
        <div className='category' key={category.id}>          
        {category.name === item ? (
          <Link to={`/${category.name}`}><button className="category-link active">{category.name}</button></Link>
        ) : (
          <Link to={`/${category.name}`}><button className="category-link">{category.name}</button></Link>
        )}        
    </div>
    ))}

    </div>
  )
}

export default Categories