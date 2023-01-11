import React, { Fragment } from 'react'

function Comments() {
  return (
    <Fragment>
      <textarea
        type="text"
        name="body"
        className="comment-textarea"
      >
        Add comments.  If user is Admin show edit and delete buttons.
      </textarea>
    </Fragment>

  )
}

export default Comments