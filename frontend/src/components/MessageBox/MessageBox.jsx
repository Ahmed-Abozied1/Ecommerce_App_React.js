import React from 'react'
import "./MessageBox.css"
function MessageBox(props) {
  return (
    <div className={`errMsg alert alert-${props.variant || 'info'}`}>
      {props.children}

    </div>
  )
}

export default MessageBox