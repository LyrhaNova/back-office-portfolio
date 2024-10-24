import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './sidebar.css';

import sidebar from './sidebar'

import Logo from "@assets/images/logo.webp"

interface SideBarProps {
  isOpen: boolean
  toggleSideBar: () => void
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSideBar }) => {
  const location = useLocation()

  return (
    <div className="flex">
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-20 transition-opacity
        bg-black opacity-50 lg:hidden`}
        onClick={toggleSideBar}
      ></div>
      <div
        className={`${isOpen ? '-translate-x-0 ease-out' : '-translate-x-full ease-in'
          } fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300
        transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <img src={Logo} className='png-logo' alt="Logo PodcastStory" width={100} />
          </div>
        </div>
        <nav className="mt-0">
          {sidebar.map(item => {
            const isCategoryActive = location.pathname === item.path

            const { type } = item;

            if (type === 'category') {
              return (
                <div key={item.name}>
                  <div className="flex gap-2 items-center px-6 py-2 mt-4 text-gray-500">
                    {item.icon && item.icon()}
                    <span className="text-gray-500 text-sm font-bold block">{item.name}</span>
                  </div>
                  <div className="mt-2 flex flex-col gap-1">
                    {item.children?.map(child => {
                      const isChildActive = location.pathname === child.path;

                      if (!child.path) return null;
                      return (
                        <Link to={child.path} key={child.name} className={`flex items-center px-6 py-2 duration-200 border-gray-100 ${isChildActive ? 'bg-gray-600 bg-opacity-25 text-gray-100 border-l-4' : 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'}`}>
                          <span className="mx-4 text-white">{child.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            } else {
              if (!item.path) return null;

              return (
                <Link
                  key={item.name}
                  aria-current="page"
                  to={item.path}
                  className={`${isCategoryActive
                    ? 'router-link-active router-link-exact-active bg-gray-600 bg-opacity-25 text-gray-100 border-l-4'
                    : 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
                    } flex items-center px-6 py-2 mt-4 duration-200 border-gray-100`}
                >
                  {item.icon && item.icon()}

                  <span className="mx-4 text-white">{item.name}</span>
                </Link>
              )
            }
          })}
        </nav>
        <div className="w-full mb-4 my-auto">
          <div className="flex items-center justify-center">
            {/* <a target='_blank' href="https://podcaststory.com/wp-login.php" className="flex items-center px-6 py-2 mt-4 text-gray-500">
              <img src={LogoWordpress} alt="Logo Wordpress" width={22} />
              <span className="mx-4 text-white font-thin">Wordpress</span>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBar
