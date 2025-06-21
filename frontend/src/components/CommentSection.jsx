import React from 'react'
import TypeComment from './TypeComment'
import DisplayComments from './DisplayComments'

const CommentSection = () => {
  return (
    <div className='flex flex-col'>
      <section><TypeComment/></section>
      <section><DisplayComments/></section>
    </div>
  )
}

export default CommentSection