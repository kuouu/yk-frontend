import "@/styles/globals.css"
import { customFetch } from "@/utils/customFetch"
import Providers from "@/components/Provider"
import { store } from "@/store"
import { setCourseList } from "@/store/courseSlice"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Preloader from "./Preloader"

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
  store.dispatch(setCourseList(courseList));
  return (
    <html lang="zh-tw">
      <body>
        <Preloader courseList={courseList}/>
        <div className='gradient' />
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
