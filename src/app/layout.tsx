import "@/styles/globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: '你的知識',
  description: '讓你學以致用的線上學習平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-tw">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
