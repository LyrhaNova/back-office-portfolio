import routes from '@src/routes';
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

interface INavbarProps {
    toggleSideBar: () => void
}

const Navbar: React.FC<INavbarProps> = ({ toggleSideBar }) => {
    const menuRight: any = useRef(null)

    const navigate = useNavigate()

    const items = [
        {
            label: 'Profile',
            items: [
                {
                    label: 'Mon compte',
                    icon: 'pi pi-fw pi-user',
                    command: () => {
                        navigate(routes.PROFILE)
                    }
                },
                {
                    label: 'Déconnexion',
                    icon: 'pi pi-fw pi-power-off'
                }
            ]
        }
    ];

    return (
        <div className='w-full flex p-4 px-8 items-center justify-between bg-slate-700'>
            <div className="flex items-center">
                <button className="text-gray-500 focus:outline-none lg:hidden" onClick={toggleSideBar}>
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4 6H20M4 12H20M4 18H11"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </button>
            </div>

            <div>
                <button onClick={(event) => menuRight.current!.toggle(event)} className='focus:outline-none'>
                    <Avatar icon='pi pi-user' shape='circle' className='mr-4' />
                </button>
                <Menu model={items} popup ref={menuRight} id="popup_menu_right" className='mt-2' popupAlignment="right" />
            </div>
        </div>
    )
}

export default Navbar