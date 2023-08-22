"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Users from "@/components/admin/Users";
import Events from "@/components/admin/Events";
import CreateEvent from "@/components/admin/CreateEvent";

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session || session.user.isAdmin === false) {
        router.push("/");
    }

    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Header />
            <div className='bg-primary p-6 grow'>
                <div className='max-w-[1000px] mx-auto my-0 bg-base-100 rounded p-6 h-fit'>
                    <Users />
                    <Events />
                    <CreateEvent />
                </div>
            </div>
        </div>
    );
}
