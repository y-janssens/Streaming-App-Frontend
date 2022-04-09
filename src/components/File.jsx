import React from 'react'
import "../styles/content.css"
import '../styles/file.css'

function File(props) {

  return (
      <>
      {props.anchor !== null && (
        <div className="files-handling-items">
            <p>{props.name.slice(0,40)}</p>
            <button className="files-handling-crud" onClick={() => props.reset(null)}>X</button>
        </div>
      )}
    </>
  )
}

export default File