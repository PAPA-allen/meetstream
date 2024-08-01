import { cn } from '@/lib/utils';
import { Icon, PlusIcon } from 'lucide-react'
import Image from 'next/image';
import React from 'react'


type HomeCardProps={
    img:string;
    title:string;
    className:string;
    description:string;
    handleClick:()=>void;
}
const HomeCard = ({img, title, className, description, handleClick}:HomeCardProps) => {
  return (
    <div className={cn("flex flex-col xl:max-w-[270px] min-h-[260px] justify-between w-full px-4 py-6 rounded-md cursor-pointer hover:shadow-lg", className)} onClick={handleClick}>
    <div >
        <Image src={img} alt="img" width={27} height={27}/>
    </div>
    <div className="flex flex-col gap-2">
        <h1 className="text-white font-extrabold text-2xl">{title}</h1>
        <p className="text-white font-medium">{description}</p>
    </div>
</div>
  )
}

export default HomeCard
