import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

function MainCategories() {
  return (
    <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
        {/* links */}
        <div className="flex-1  flex items-center justify-between flex-wrap">
        <Link to="/posts" className='bg-blue-800 text-white rounded-full px-4 py-2'>All Posts</Link>
        <Link to="/posts?cat=web-design" className='hover:bg-blue-50  rounded-full px-4 py-2'>Web Design</Link>
        <Link to="/posts?cat=development" className='hover:bg-blue-50  rounded-full px-4 py-2'>Development</Link>
        <Link to="/posts?cat=databases" className='hover:bg-blue-50  rounded-full px-4 py-2'>Databases</Link>
        <Link to="/posts?cat=devops" className='hover:bg-blue-50  rounded-full px-4 py-2'>DevOps</Link>
        <Link to="/posts?cat=aws" className='hover:bg-blue-50  rounded-full px-4 py-2'>AWS</Link>
        <Link to="/posts?cat=azure" className='hover:bg-blue-50  rounded-full px-4 py-2'>Azure</Link>        
        </div>
        <span className='text-xl font-medium'>|</span>
        {/* search input */}
        <div className="bg-gray-100 rounded-full flex items-center gap-2">
        <Search/>
            
        </div>
      
    </div>
  )
}

export default MainCategories
