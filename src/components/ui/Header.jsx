import React from 'react'
import users from "../../assets/users.jpg"

const Header = () => {
  return (
    <header className='shadow-sm'>
        <div className='flex items-center justify-between px-10 py-5 '>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-gray-500 to-gray-600 bg-clip-text text-transparent ">
          MAGLO
        </h1>
            <div>
                <img width={50} src={users} alt="users" className='rounded-full' />
            </div>
        </div>
    </header>
  )
}

export default Header
