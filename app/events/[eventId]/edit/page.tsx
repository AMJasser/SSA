"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Header from "@/components/Header";

export default function Page({
    params: { eventId }
}: {
    params: { eventId: string };
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");

    const { data: session } = useSession();
    const router = useRouter();

    if (!session || session.user.isAdmin === false) {
        router.push("/");
    }

    const fetchEvent = async () => {
        const res = await fetch(`/api/events/${eventId}`);
        const json = await res.json();
        setTitle(json.event.title);
        setDescription(json.event.description);
        setDate(json.event.date);
        setLocation(json.event.location);
        setImage(json.event.image);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch(`/api/events/${eventId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description,
                date,
                location,
                image
            })
        });

        if (res.ok) {
            router.push("/events");
            router.refresh();
        }
    }

    useEffect(() => {
        if (session) {
            fetchEvent();
        }
    }, [session]);

    console.log(title, image);

    return (
        <>
            <Header />
            <h2 className='text-3xl font-bold'>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <input
                    title='Title'
                    placeholder='Title'
                    value={title}
                    className='input input-bordered w-full block'
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <input
                    title='Description'
                    placeholder='Description'
                    value={description}
                    className='input input-bordered w-full block'
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />
                <input
                    title='Date'
                    type='datetime-local'
                    value={date.toString()}
                    className='input input-bordered w-full block'
                    onChange={(e) => setDate(e.currentTarget.value)}
                />
                <input
                    title='Location'
                    placeholder='Location'
                    value={location}
                    className='input input-bordered w-full block'
                    onChange={(e) => setLocation(e.currentTarget.value)}
                />
                <UploadButton<OurFileRouter>
                    endpoint='fileUploader'
                    onClientUploadComplete={(res) => {
                        if (res) {
                            setImage(res[0].url);
                        }
                    }}
                />
                <button type='submit' className='btn btn-primary'>
                    Edit Event
                </button>
            </form>
        </>
    );
}
