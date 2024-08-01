"use client";
import React, { useState, useEffect } from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarTabs } from '@/constant';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const MobileNav = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="w-full max-w-[264px]">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Menu onClick={() => setIsOpen(true)} className="md:hidden" />
                </SheetTrigger>
                <SheetContent side="left" className="border-none">
                    <Link href="/" className="flex items-center ">
                        <Image src="icons/Logo.svg" alt="logo" width={40} height={40} className="" />
                        <p className="font-extrabold text-lg">Meet<span className="text-blue-500">Stream</span></p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16">
                                {SidebarTabs && SidebarTabs.map((item) => {
                                    const isActive = pathname === item.route;

                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link href={item.route} className={cn('items-center p-5 flex gap-4 rounded-lg justify-start', {
                                                "bg-blue-500": isActive
                                            })}>
                                                <Image src={item.imgUrl} alt={item.imgUrl} width={20} height={20} />
                                                <p className="font-semi-bold text-lg">{item.name}</p>
                                            </Link>
                                        </SheetClose>
                                    );
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;
