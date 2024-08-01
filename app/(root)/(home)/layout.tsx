import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MeetStream",
  description: "Video Calling App",
  icons:{
    icon:"/icons/Logo.svg"
  }
};
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative">
          <Navbar/>
            <div className="flex">
               <Sidebar/>
                <section className="flex flex-1 min-h-screen px-6 pt-28 flex-col pb-6 max-md:pb-14 sm:px-14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>

        </div>
    )
}

export default HomeLayout