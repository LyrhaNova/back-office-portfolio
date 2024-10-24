import React, { useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'

interface INavContainerProps {
    children: React.ReactNode
}

const NavContainer: React.FC<INavContainerProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSideBar = () => setIsOpen(!isOpen)

    return (
        <div className='flex h-screen bg-gray-200'>
            <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <Navbar toggleSideBar={toggleSideBar} />
                <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-200  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'>
                    <div className='container mx-auto px-6 py-8'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default NavContainer