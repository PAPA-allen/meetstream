import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';


type callLayoutType = 'grid' | 'speaker-left' | 'speaker-right'


const MeetingRoom = () => {
    const searchParams = useSearchParams()
    const isPersonalRoom = !!searchParams.get('personal')
    const [layout, setLayout] = useState('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);
const router = useRouter();
    const {useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();
    if(callingState !== CallingState.JOINED) return <Loader/>
    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout
                    participantsBarPosition="left" />
            default:
                return <SpeakerLayout
                    participantsBarPosition="left" />
        }
    }
    return (
        <section className="relative h-screen w-full overflow-hidden pt-4">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div className={cn("h-[calc(100vh-86px) hidden ml-2", { 'show-block': showParticipants })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap p-2">
                <CallControls onLeave={()=>router.push('/')}/>
                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl hover:bg-gray-300 px-4 py-2">
                            <LayoutList size={20} />
                        </DropdownMenuTrigger>

                    </div>
                    <DropdownMenuContent>
                        {['Grid', 'Speaker-Left', 'Speaker-right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                                    setLayout(item.toLowerCase() as callLayoutType)
                                }}>
                                    {item}
                                </DropdownMenuItem>
                            </div>
                        ))}
                        <DropdownMenuSeparator />

                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button onClick={() => setShowParticipants((prev) => !prev)}>
                    <div className="cursor-pointer rounded-2xl hover:bg-gray-300 px-6 py-2">
                        <Users size={20} />
                    </div>
                </button>
                {!isPersonalRoom && <EndCallButton/>}
            </div>
        </section>
    )
}

export default MeetingRoom
