"use client";

import { SidebarTabs } from '@/constant'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <nav className="sticky flex left-0 top-0 w-fit h-screen justify-between flex-col lg:w-[264px] max-sm:hidden p-6 pt-28 shadow-lg">
            <div className="flex flex-1 flex-col gap-6">
                {SidebarTabs && SidebarTabs.map((item) => {
                    const isActive = pathname === item.route
                    return (
                        <Link href={item.route} key={item.name} className={cn('items-center p-4 flex gap-4 rounded-lg justify-start',{
                            "bg-blue-500": isActive
                        })}>
                            <Image src={item.imgUrl} alt={item.imgUrl} width={20} height={20} />
                            <p className="font-semi-bold hidden md:flex text-lg">{item.name}</p>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default Sidebar
