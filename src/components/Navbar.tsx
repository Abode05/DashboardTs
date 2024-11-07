import { ChangeEvent, useContext, useEffect, useState } from "react"
import { FaMoon } from "react-icons/fa"
import { Context } from "../App"

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('User') || 'null')
    const [result, setResult] = useState<string>('')

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
    <div
      className={`p-4 w-full flex fixed justify-between   bg-white
      shadow dark:bg-dark-2 dark:text-gray-200   z-10  
     `}
    >
      <div className="relative hidden md:block ">
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
    </div>
  )
}

export default Navbar