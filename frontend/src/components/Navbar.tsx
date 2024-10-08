import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div>
        <nav className="bg-gray-800 text-white p-4 top-0 fixed w-full z-50">
            <div className="container mx-auto flex justify-between flex items-center">
            <div className="text-3xl">Medium</div>
            <div>
                <button className='w-24 h-9 bg-white text-gray-800 font-semibold rounded-md' 
                onClick={()=>navigate("/signup")}   
                >Join now</button>
            </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar