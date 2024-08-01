import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center h-screen justify-center w-full">
            <SignIn />
        </div>
    );
}