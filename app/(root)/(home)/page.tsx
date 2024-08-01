import MeetingTypeList from "@/components/MeetingTypeList";
import Image from "next/image";

export default function Home() {
  const now = new Date();
  const date = (new Intl.DateTimeFormat("en-US",{
    dateStyle:"full"
  })).format(now);
  const time = now.toLocaleTimeString('en-US',{hour:"2-digit", minute:"2-digit"});
  return (
    <section className="flex size-full gap-4 flex-col">
      <div className="h-[300px] rounded-lg w-full bg-hero bg-cover">
        <div className="flex flex-col h-full lg:p-11 px-6 py-8 justify-between">
          <h2 className=" py-2">Meeting at 3:00 pm</h2>
          <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-3xl lg:text-5xl animate-pulse transition">
              {time}
            </h1>
            <p className="font-medium text-lg lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  );
}