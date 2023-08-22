"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function CreateEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/events", {
            method: "POST",
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
        }
    };

    return (
        <>
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
                    Create Event
                </button>
            </form>
        </>
    );
}
