"use client"
import { DARK_MODE, LIGHT_MODE, ThemeContext } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"

const Header = () => {
  const { changeTheme, theme } = useContext(ThemeContext)
  const light_mode = LIGHT_MODE
  const [currentTheme, setCurrentTheme] = useState<string | string>(LIGHT_MODE)
  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])

  const handleThemeChange = () => {
    const newTheme = currentTheme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE
    setCurrentTheme(newTheme)
    changeTheme(newTheme)
  }

  return (
    <div className="flex justify-center p-8">
      <div className="w-[700px]">
        <header
          className={cn("navbar rounded-full shadow-2xl border ", {
            "bg-white border-black/30": theme === LIGHT_MODE,
            "bg-white/10": theme === DARK_MODE,
          })}
        >
          <div className="navbar-start px-8 font-bold text-xl">
            <Link href={"/"}>Easy Meal</Link>
          </div>
          <div className="navbar-center gap-8">
            <div className="hover:bg-primary/60 py-1 px-4 rounded-full">
              <Link href={"/plan"}>Home</Link>
            </div>
            <div className="hover:bg-primary/60 py-1 px-4 rounded-full">
              <Link href={"/plan/profile"}>Profile</Link>
            </div>
            <div className="hover:bg-primary/60 py-1 px-4 rounded-full">
              <Link href={"/plan/history"}>History</Link>
            </div>
          </div>
          <div className="navbar-end">
            <label className="swap swap-rotate px-8">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === DARK_MODE}
                onChange={handleThemeChange}
              />

              {/* sun icon */}
              <svg
                className="swap-off fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              {/* moon icon */}
              <svg
                className="swap-on fill-current w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Header
