"use client";

import Index from "@/components/home";
import { useThemeStore } from "@/store/themestore";

export default function Home() {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  return (
    <main className={`${
        isDark ? "bg-[#121212]" : "bg-[#FAF9F6]"
      } min-h-screen transition-colors duration-500`}>
      <div className={`w-full min-h-screen max-w-7xl lg:px-5 mx-auto transition-colors duration-500`}>
        <Index />
      </div>
    </main>
  );
}