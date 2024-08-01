import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const s = () => {
  return (
    <div className="flex justify-between z-50 shadow-sm fixed h-[80px] w-full bg-background px-6 items-center">
      <Link href="/" className="flex gap-1 items-center">
      <Image src="icons/Logo.svg" alt="logo" width={40} height={40} className="justify-center flex items-center"/>
      <p className="font-extrabold text-2xl">Meet<span className="text-blue-500">Streams</span></p>
      </Link>
      <div className="flex gap-4">
    <SignedIn>
        <UserButton/>
    </SignedIn>
        <MobileNav/>
      </div>
    </div>
  )
}

export default s
