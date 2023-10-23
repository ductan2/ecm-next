import { AdminNav } from '@/components/nav/AdminNav'
import React from 'react'

type props = {
  children: React.ReactNode
}
const AdminDashboard = ({ children }: props) => {
  return (
    <>
      <AdminNav />
      {children}
    </>
  )
}

export default AdminDashboard