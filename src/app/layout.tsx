import "@/styles/globals.css"
import Provider from "@/Provider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import { getCourses } from "@/api/tutor"

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
        <Provider>
          <Navbar courses={courses} />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
