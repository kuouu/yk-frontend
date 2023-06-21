'use client'

import { useSession } from "next-auth/react"

const DashboardPage = () => {
  const { data: session, status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      This is {session.user?.name}'s dashboard
    </div>
  )
}

export default DashboardPage