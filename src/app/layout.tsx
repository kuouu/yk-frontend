import "@/styles/globals.css"
import Navbar from "@/components/Navbar"

import { getCourses } from "@/utils/tutor"

export const metadata = {
  title: '你的知識',
  description: '讓你學以致用的線上學習平台',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const courses = await getCourses();
  return (
    <html lang="zh-tw">
      <body>
        <Navbar courses={courses}/>
        {children}
      </body>
    </html>
  )
}
