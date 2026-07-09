import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNavbar from '../components/TopNavbar'
import BottomNavbar from '../components/BottomNavbar'
// import ChatWidget from '../components/ChatWidget'
import WhatsappWidget from '../components/WhatsappWidget'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar />
      <main className="pt-16 pb-20 px-4 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <BottomNavbar />
      {/* <ChatWidget />  */}
      <WhatsappWidget /> 
    </div>
  )
}

export default MainLayout