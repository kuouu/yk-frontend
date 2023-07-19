import "@/styles/globals.css"
import { customFetch } from "@/utils/customFetch"
import Providers from "@/components/Provider"
import { store } from "@/store"
import { setCourseList } from "@/store/courseSlice"
import Navbar from "./(home)/Navbar"
import Footer from "./(home)/Footer"
import Preloader from "./(home)/Preloader"

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
        <div className='gradient' />
        <Providers>
          <Preloader courseList={courseList}/>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
