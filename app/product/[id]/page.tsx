'use client'

import { ProductDetails } from '@/components/home/productdetail'
import { useThemeStore } from '@/store/themestore';


const page = () => {
    const theme = useThemeStore((state) => state.theme);
    const isDark = theme === 'dark';

  return (
    <div className={`${
        isDark ? "bg-[#121212]" : "bg-[#FAF9F6]"
      } min-h-screen transition-colors duration-500`}
    >

        <div className='w-full min-h-screen max-w-7xl mx-auto'>
            <ProductDetails />
        </div>
    </div>
  )
}

export default page
