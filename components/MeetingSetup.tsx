'use client';
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void}) => {
    const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

    const call = useCall();

    if (!call) {
        throw new Error('usecall must be used within streamcall component')
    }
    useEffect(() => {
        if (isMicCamToggleOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggleOn, call?.camera, call?.microphone])
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-26 items-center justify-center gap-3">
                <label className="flex tems-center gap-2 justify-center font-medium">
                    <input
                        type="checkbox"
                        checked={isMicCamToggleOn}
                        onChange={(e) => setIsMicCamToggleOn(e.target.checked)} />
                    Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={()=>{call.join();
                setIsSetupComplete(true);
            }}>
                Join Meeting
            </Button>
        </div>
    )
}

export default MeetingSetup
