"use client"

import { createContext, useEffect, useState } from "react"

interface ThemeContextValue {
  theme: string
  changeTheme: (newTheme: string) => void
}

export const LIGHT_MODE = "bumblebee"
export const DARK_MODE = "dim"

export const ThemeContext = createContext<ThemeContextValue>({
  theme: LIGHT_MODE,
  changeTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(LIGHT_MODE)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const storedTheme = localStorage.getItem("theme") || LIGHT_MODE
    setTheme(storedTheme)
  }, [])

  if (!isMounted) {
    return <>Loading...</>
  }

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  const themeContextValue: ThemeContextValue = {
    theme,
    changeTheme,
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
