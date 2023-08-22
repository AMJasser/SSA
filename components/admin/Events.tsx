"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { confirmAlert } from "react-confirm-alert";
import Link from "next/link";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Events() {
    const [events, setEvents] = useState([]);

    const { data: session } = useSession();

    const fetchEvents = async () => {
        const res = await fetch("/api/events");
        const json = await res.json();
        setEvents(json.events);
    };

    const deleteEvent = async (id: string) => {
        const res = await fetch(`/api/events/${id}`, {
            method: "DELETE"
        });

        if (res.ok) {
            fetchEvents();
        }
    };

    const confirmDelete = (id: string, title: string) => {
        confirmAlert({
            title: `Delete ${title}`,
            message: "Are you sure you want to delete this event?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteEvent(id)
                },
                {
                    label: "No"
                }
            ]
        });
    };

    useEffect(() => {
        if (session) {
            fetchEvents();
        }
    }, [session]);

    return (
        <>
            <h2 className='text-3xl font-bold'>Events</h2>
            <div className='overflow-x-auto'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>title</th>
                            <th>description</th>
                            <th>date</th>
                            <th>location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length > 0 &&
                            events.map(
                                (
                                    event: {
                                        id: string;
                                        title: string;
                                        description: string;
                                        date: string;
                                        location: string;
                                    },
                                    index
                                ) => (
                                    <tr key={event.id}>
                                        <td>{index + 1}</td>
                                        <td>{event.title}</td>
                                        <td>
                                            {event.description.length > 45
                                                ? event.description.substring(
                                                      0,
                                                      45
                                                  ) + "..."
                                                : event.description}
                                        </td>
                                        <td>{event.date}</td>
                                        <td>{event.location}</td>
                                        <td className='flex flex-row justify-start items-center gap-2'>
                                            <Link
                                                href={`/events/${event.id}/edit`}
                                                className='btn btn-warning'
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    confirmDelete(
                                                        event.id,
                                                        event.title
                                                    )
                                                }
                                                className='btn btn-error'
                                            >
                                                Delete
                                            </button>
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
