import "@/styles/globals.css"
import Provider from "@/Provider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: '你的知識',
  description: '讓你學以致用的線上學習平台',
}

const getCourseList = async () => {
  try {
    const res = await fetch(`${process.env.HOST_URL}/api/courses`, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
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
