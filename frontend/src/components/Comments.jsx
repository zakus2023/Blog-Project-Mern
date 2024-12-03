import React from 'react'
import Comment from './Comment'

function Comments() {
  return (
    <div className='flex flex-col gap-8 lg:w-3/5'>
      <h1 className='text-xl text-gray-500 underline'>Comments</h1>
      <div className="flex items-center justify-between gap-8 w-full">
        <textarea name="" placeholder='Write a comment' id="" className='w-full p-4 rounded-xl'/>
        <button className='bg-blue-800 px-4 py-3 text-white font-medium rounded-xl'>Send</button>
      </div>
      <Comment/>
    </div>
  )
}

export default Comments
