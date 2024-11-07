import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import {  ToastContainer } from 'react-toastify';
interface LinkItem {
  link: string;
  title: string;
  icons?: string;
}
interface SidebarProps{
  links:Array<LinkItem>
}
const SideBar = ({ links }: SidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('User')
      
      setTimeout(() => {
        navigate('/auth')
      }, 2000)
    
  }
   const closeModal = () => {
     setIsModalOpen(false)
   }
  return (
    <div className="p-6 w-64 h-screen  flex flex-col z-50 shadow-sm  dark:bg-dark-2 dark:text-gray-200 ">
      <h1 className="text-3xl font-bold mb-8 ">
        <span className="text-blue-1 relative  "> Dash</span>Stack
      </h1>
      <div className="flex flex-col justify-between  ">
        <ul className="flex flex-col gap-4  relative  justify-center mt-3">
          {links.map((item, index) => (
            <li
              key={index}
              className="  flex flex-col justify-center text-lg   "
            >
              <NavLink to={item.link}>
                {({ isActive }) => (
                  <div className="flex relative justify-start ">
                    <div
                      className={
                        isActive
                          ? 'border-r-4 border-blue-1 relative right-5 h-16  rounded-r-2xl duration-200'
                          : ''
                      }
                    ></div>
                    <div className="flex gap-4 justify-start items-center  w-full ">
                      <i
                        className={`${item.icons} dark:text-white w-6 h-6 p-1 `}
                      ></i>
                      <p className="text-xl relative -top-1 ">{item.title}</p>
                    </div>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-auto bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 duration-150 
          font-semibold text-lg
          "
        onClick={() => setIsModalOpen(true)}
      >
        Logout
      </button>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleLogOut}
        title="Are you sure you want to Logout?"
      />
      <ToastContainer/>
    </div>
  )
}

export default SideBar

