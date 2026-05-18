import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ContainerLayout from "@/components/general/container";

// Configure your fonts and assign them to CSS variables
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whazzonline",
  description: "Discover the future of online shopping with Whazzonline - your ultimate destination for unique, high-quality products. Explore our curated collection and experience seamless shopping like never before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ContainerLayout>
          {children}
        </ContainerLayout>
      </body>
    </html>
  );
}