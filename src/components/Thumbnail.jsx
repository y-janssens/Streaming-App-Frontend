import '../styles/thumbnail.css'

function Thumbnail({name, author, path}) {

  return (
      <div className="thumbnail-container">
          <div className='thumbnail-body'>
          <div className="thumbnail-icon">&#9658;</div>
                <img src={`${path}`} alt={name} />
          </div>
          <h4>{name}</h4>
          <p>{author}</p>
      </div>
    
  )
}

export default Thumbnail