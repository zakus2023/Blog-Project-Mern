import React from 'react'
import PostComponent from './PostComponent'

function PostListComponent() {
  return (
    <div className='flex flex-col gap-12 mb-8'>
      <PostComponent/>
      <PostComponent/>
      <PostComponent/>
      <PostComponent/>
      <PostComponent/>
      <PostComponent/>
    </div>
  )
}

export default PostListComponent
