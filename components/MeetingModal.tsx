import React, { ReactNode } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { cn } from '@/lib/utils';

type MeetingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText: string;
  children?: ReactNode;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({ isOpen, onClose, title, className, buttonText, handleClick, children, image, buttonIcon }: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[520px] flex flex-col gap-6 border-none px-6 py-9">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn('text-3xl font-bold', className)}>{title}</h1>
          {children}
          <Button className="bg-blue-500 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
            {buttonIcon && (
              <Image src={buttonIcon} alt="button icon" width={13} height={13}/>
            )}&nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal