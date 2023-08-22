"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Users() {
    const [users, setUsers] = useState([]);

    const { data: session } = useSession();

    const fetchUsers = async () => {
        const res = await fetch("/api/users");
        const json = await res.json();
        setUsers(json.users);
    };

    const updateUser = async (id: string, data: any) => {
        const res = await fetch(`/api/users/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
        const json = await res.json();

        // Find the index of the user that was updated
        const index = users.findIndex((user: { id: string }) => user.id === id);

        // Create a copy of the users array
        let usersCopy = [...users];

        // Replace the user that was updated with the updated user
        // @ts-ignore
        usersCopy[index] = json.user;

        // Update the state
        setUsers(usersCopy);
    };

    useEffect(() => {
        if (session) {
            fetchUsers();
        }
    }, [session]);

    return (
        <>
            <h2 className='text-3xl font-bold'>Users</h2>
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
                                        verified: boolean;
                                        isAdmin: boolean;
                                    },
                                    index
                                ) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.email}</td>
                                        <td>{user.name}</td>
                                        <td className='flex flex-row justify-start items-center gap-2'>
                                            {user.verified && (
                                                <button className='btn btn-warning' onClick={() => updateUser(user.id, { verified: false })}>
                                                    Unverify
                                                </button>
                                            )}
                                            {!user.verified && (
                                                <button className='btn btn-info' onClick={() => updateUser(user.id, { verified: true })}>
                                                    Verify
                                                </button>
                                            )}
                                            {user.isAdmin && (
                                                <button className='btn btn-warning' onClick={() => updateUser(user.id, { isAdmin: false })}>
                                                    Remove Admin
                                                </button>
                                            )}
                                            {!user.isAdmin && (
                                                <button className='btn btn-info' onClick={() => updateUser(user.id, { isAdmin: true })}>
                                                    Make Admin
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
