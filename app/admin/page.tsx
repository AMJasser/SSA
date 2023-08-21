"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
    const [users, setUsers] = useState([]);

    const { data: session } = useSession();
    const router = useRouter();

    if (session && session.user.isAdmin === false) {
        router.push("/");
    }

    const fetchUsers = async () => {
        const res = await fetch("/api/users");
        const json = await res.json();
        setUsers(json.users);
    };

    useEffect(() => {
        if (session) {
            fetchUsers();
        }
    }, [session]);

    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Header />
            <div className='bg-primary p-4 grow'>
                <div className='artboard artboard-horizontal phone-6 mx-auto my-0 bg-base-100 rounded p-4'>
                    <h2 className="text-3xl font-bold">Users</h2>
                    <div className='overflow-x-auto'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 &&
                                    users.map(
                                        (
                                            user: {
                                                email: string;
                                                name: string;
                                                id: string;
                                            },
                                            index
                                        ) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.email}</td>
                                                <td>{user.name}</td>
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
