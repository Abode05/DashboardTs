import { ChangeEvent, useContext, useEffect, useState } from "react"
import { FaMoon } from "react-icons/fa"
import { Context } from "../App"
import { NavLink } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi"
import { linkSideBar } from "../constant/data"

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('User') || 'null')
    const [, setResult] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  const { SetSearchFilter } = useContext(Context)


  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')
  const elemant = document.documentElement
useEffect(() => {
  localStorage.setItem('theme', theme)
  if (theme === 'dark') {
    elemant.classList.add('dark')
    elemant.classList.remove('light')
  } else {
    elemant.classList.add('light')
    elemant.classList.remove('dark')
  }
}, [theme, elemant])

const toggleTheme = ():void => {
  setTheme(theme === 'dark' ? 'light' : 'dark')
}
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value

  setResult(searchValue)
  SetSearchFilter(searchValue.toLowerCase())
  }
  return (
    <>
    <div
      className={`p-4 w-full flex items-center fixed justify-between   bg-white
      shadow dark:bg-dark-2 dark:text-gray-200   z-10    
     `}
    >
      <div className="relative hidden md:block  ">
        <img
          src="/assets/icons/search.svg"
          alt=""
          className="absolute top-2 left-2"
        />
        <input
          type="text"
          placeholder="Search a product ..."
          className="bg-secondary rounded-full w-56 h-8 pl-8 text-black"
          name=""
          onChange={handleSearch}
        />
      </div>

      {user && (
        <div className="flex gap-3 items-center justify-center relative md:right-64">
          <img
            src={user.profile_image_url}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <h1 className="font-bold uppercase">{user.first_name}</h1>
            <p className="text-sub -mt-2">{user.user_name}</p>
          </div>
          <div className="m-auto">|</div>
          <div className="cursor-pointer text-xl" onClick={toggleTheme}>
            <FaMoon />
          </div>
        </div>
      )}
        <div className="block md:hidden cursor-pointer" onClick={()=>setIsOpen(!isOpen)}>
          <FiAlignJustify  className="text-2xl"/>

        </div>
        
      </div>
      {isOpen && (
        <div className="absolute  md:hidden
         z-10 h-screen top-0 left-0 right-0 dark:text-white bg-white dark:bg-dark-2
          shadow-md p-8">

          <div className="relative ">
            <img
              src="/assets/icons/search.svg"
              alt=""
              className="absolute top-2 left-2"
            />
            <input
              type="text"
              placeholder="Search a product ..."
              className="bg-secondary rounded-full w-full h-8 pl-8"
              name=""
              onChange={handleSearch}
            />
            <div className="flex flex-col justify-between ">
              <ul className="flex flex-col gap-4 relative justify-center mt-8">
                {linkSideBar.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col justify-center text-lg hover:bg-slate-700 p-2 rounded-md "
                    onClick={()=>setIsOpen(false)}
                  >
                    <NavLink to={item.link}>
                      
                        <div className="flex relative justify-center">
                        
                          <div className="flex gap-4 justify-center items-center w-full">
                            <p className="text-xl    relative -top-1">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      
    </>
  )
}

export default Navbar