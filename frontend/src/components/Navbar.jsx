import React from 'react'

export default function Navbar() {
  return (
    <div>
   
    <div className="w-screen flex flex-row items-center p-1 justify-between bg-white shadow-xs">
      <div className="ml-8 text-lg text-gray-700 hidden md:flex">My Website</div>
      <span className="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex">
        <input type="search" name="serch" placeholder="Search"
          className="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"/>
        <i className="fas fa-search m-3 mr-5 text-lg text-gray-700 w-4 h-4">
        </i>
      </span>
      <div className="flex flex-row-reverse mr-4 ml-4 md:hidden">
        <i className="fas fa-bars"></i>
      </div >
        <div className="flex flex-row-reverse mr-8 hidden md:flex">
          <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Button</div>
          <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Link</div>
          <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">Friends</div>
        </div>
    </div></div>
  )
}
