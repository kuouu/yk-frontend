'use client'

import Sidebar from "./Sidebar";
import EnrollCourses from "./EnrollCourses";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/store/hook";
import { selectIsLogin } from "@/store/userSlice";

const DashboardPage = () => {
  const isLogin = useAppSelector(selectIsLogin);

  if (!isLogin) {
    redirect('/')
  }

  return (
    <div
      className="grid grid-cols-12 gap-2 justify-items-center p-2"
    >
      <div className="col-span-4 items-start">
        <Sidebar />
      </div>
      <div className="col-span-8">
        <EnrollCourses />
      </div>
    </div>
  )
}

export default DashboardPage