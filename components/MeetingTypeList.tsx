"use client";

import { Calendar, PlusIcon, User } from "lucide-react";
import HomeCard from "./HomeCard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | 'undefined'>();

    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    });
    const [callDetails, setcallDetails] = useState<Call>();
    const { toast } = useToast()
    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast({ title: "Please select a date and time" });
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);

            if (!call) throw new Error('failed to create call');
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setcallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({
                title: "Meeting Created",

            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Failed to create meeting",

            })
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <HomeCard
                img="/icons/addmeeting.svg"
                title="New meetings"
                description="Start Meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-red-400"
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule meetings"
                description="Plan your meetings"
                handleClick={() => setMeetingState("isScheduleMeeting")}
                className="bg-yellow-400"
            />
            <HomeCard
                img="/icons/record.svg"
                title="View Recordings"
                description="Checkout your recordings"
                handleClick={() => router.push("/recordings")}
                className="bg-gray-400" />

            <HomeCard
                img="/icons/privatemeeting.svg"
                title="Join Meeting"
                description="via invitation link"
                handleClick={() => setMeetingState("isJoiningMeeting")}
                className="bg-green-400" />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting} buttonText={""}>
                    <div className="flex flex-col gap-2">
                        <label className="leading=[22px]">Add a description</label>
                        <Textarea  onChange={(e) => { setValues({ ...values, description: e.target.value }) }} />

                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <label className="leading-[22px]">Select Date and Time</label>
                        <ReactDatePicker
                        selected={values.dateTime}
                        onChange={(date)=>setValues({...values, dateTime:date!})} showTimeSelect timeFormat="HH:mm"
                        timeIntervals={15} timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" className="w-full rounded p-2 focus:outline-none"/>
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    className="text-center"
                    buttonText="Copy Meeting Link"
                    handleClick={() => {navigator.clipboard.writeText(meetingLink);
                        toast({title:'Link Copied'})
                     }}
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                />
            )}
            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start an instant meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting} />

<MeetingModal
                isOpen={meetingState === "isJoiningMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={()=>router.push(values.link)}>
                    <Input placeholder="Meeting Link"
                    onChange={(e)=>setValues({...values, link:e.target.value })}/>
                </MeetingModal>
        </section>
    )
}

export default MeetingTypeList
