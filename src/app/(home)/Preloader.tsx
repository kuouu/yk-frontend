"use client";

import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setCourseList } from "@/store/courseSlice";
import { clearUser, setUser, setEnrolledCourses, selectIsLogin } from "@/store/userSlice";
import { useSession } from "next-auth/react";
import { customFetch } from "@/utils/customFetch";

const getEnrolledList = async (userId: string | undefined) => {
  if (!userId) return []
  const url = `/api/enrolled-courses?id=${userId}`;
  const res = await customFetch(url);
  return res;
};

function Preloader({ courseList }: { courseList: CourseListType[] }) {
  const loaded = useRef(false);
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectIsLogin);

  useEffect(() => {
    // remove redux state when user logout
    if (isLogin && status === "unauthenticated") {
      dispatch(clearUser());
    }
    // set redux state when user login
    if (status === "authenticated") {
      dispatch(setUser(
        {
          ...session?.user,
          id: Number(session?.user?.id)
        }
      ));
      getEnrolledList(session?.user?.id).then((res) => {
        const courses = res.map((item: { id: string }) => Number(item.id))
        dispatch(setEnrolledCourses([...new Set(courses)]));
      });
    }
  }, [dispatch, isLogin, session?.user, status]);

  if (!loaded.current) {
    dispatch(setCourseList(courseList));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
