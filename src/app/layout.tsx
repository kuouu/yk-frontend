import "@/styles/globals.css"
import { customFetch } from "@/customFetch"
import Provider from "@/Provider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: '你的知識',
  description: '讓你學以致用的線上學習平台',
}

const getCourseList = async () => {
  const url = `${process.env.HOST_URL}/api/courses`;
  const res = await customFetch(url);
  return res;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const courseList = await getCourseList();
  return (
    <html lang="zh-tw">
      <body>
        <Provider courseList={courseList}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
