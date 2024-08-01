import StreamVideoProvider from '@/provider/StreamClientProvider'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MeetStream",
  description: "Video Calling App",
  icons:{
    icon:"/icons/Logo.svg"
  }
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>

    </main>
  )
}

export default RootLayout
