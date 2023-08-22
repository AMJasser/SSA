"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Users from "@/components/admin/Users";

export default function Page() {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session || session.user.isAdmin === false) {
        router.push("/");
    }

    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Header />
            <div className='bg-primary p-4 grow'>
                <div className='artboard artboard-horizontal phone-6 mx-auto my-0 bg-base-100 rounded p-4'>
                    <Users />
                </div>
            </div>
        </div>
    );
}
