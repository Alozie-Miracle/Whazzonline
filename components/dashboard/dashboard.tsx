'use client'
import { useThemeStore } from '@/store/themestore';
import React from 'react'

const Dashboard = () => {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';
  return (
    <div className={` ${ isDark ? "bg-[#121212]" : "bg-[#FAF9F6]"} w-full min-h-screen transition-colors duration-500`}>
      Dashboard
    </div>
  )
}

export default Dashboard
