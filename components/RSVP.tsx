"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RSVP({ eventId }: { eventId: string }) {
    const [eventUser, setEventUser] = useState({
        rsvp: false,
        anonymous: false
    });
    const [attendees, setAttendees] = useState([]);
    const [attendeesSearch, setAttendeesSearch] = useState("");
    const [user, update] = useState({
        verified: false,
        id: ""
    });

    const fetchUser = async () => {
        const res = await fetch("/api/users/me");
        const json = await res.json();
        update(json);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user && user?.verified) {
            fetchEventUser();
            fetchAttendees();
        }
    }, [user]);

    if (!user || !user.verified) {
        return (
            <div className='text-center p-6 border border-neutral rounded'>
                <h2 className='font-bold text-3xl'>
                    You are yet to be verified.
                </h2>
                <p>
                    Please ask one of the board members to verify your account
                    so you can RSVP.
                </p>
            </div>
        );
    }

    const fetchAttendees = async () => {
        if (!user || !user.verified) return;

        const res = await fetch(`/api/rsvp/${eventId}`);
        const json = await res.json();
        setAttendees(json);
    };

    const fetchEventUser = async () => {
        if (!user || !user.verified) return;
        const res = await fetch(`/api/rsvp/${eventId}/${user.id}`);
        const json = await res.json();
        setEventUser(json);
    };

    const updateRSVP = async (rsvp: boolean, anonymous: boolean) => {
        const res = await fetch(`/api/rsvp/${eventId}/${user.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                rsvp,
                anonymous
            })
        });
        const json = await res.json();
        setEventUser(json);
        if (res.ok && json.rsvp === rsvp && json.anonymous === anonymous) {
            toast.success("RSVP updated successfully.");
        } else {
            toast.error("Failed to update RSVP.");
        }
        fetchAttendees();
    };

    const attend = () => {
        setEventUser({ ...eventUser, rsvp: true });
        updateRSVP(true, eventUser.anonymous);
    };

    const notAttend = () => {
        setEventUser({ ...eventUser, rsvp: false });
        updateRSVP(false, eventUser.anonymous);
    };

    const toggleAnonymous = (anonymous: boolean) => {
        setEventUser({ ...eventUser, anonymous });
        updateRSVP(eventUser.rsvp, anonymous);
    };

    return (
        <div className='text-center p-6 rounded'>
            <h2 className='font-bold text-3xl'>RSVP</h2>
            <div className='form-control'>
                <label className='label cursor-pointer w-40 mx-auto my-0'>
                    <input
                        type='radio'
                        className='radio checked:bg-blue-500'
                        checked={eventUser?.rsvp}
                        onChange={attend}
                    />
                    <span className='label-text w-32'>Attending</span>
                </label>
            </div>
            <div className='form-control'>
                <label className='label cursor-pointer w-40 mx-auto my-0'>
                    <input
                        type='radio'
                        className='radio checked:bg-blue-500'
                        checked={!eventUser?.rsvp}
                        onChange={notAttend}
                    />
                    <span className='label-text w-32'>Not Attending</span>
                </label>
            </div>
            <div className='form-control'>
                <label className='cursor-pointer label w-40 mx-auto my-0'>
                    <input
                        type='checkbox'
                        className='checkbox checkbox-primary'
                        checked={eventUser?.anonymous}
                        onChange={(e) =>
                            toggleAnonymous(e.currentTarget.checked)
                        }
                    />
                    <span className='label-text w-32'>Anonymous</span>
                </label>
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-3xl'>Attendees</h2>
                <input
                    type='text'
                    placeholder='Search...'
                    value={attendeesSearch}
                    onChange={(e) => setAttendeesSearch(e.currentTarget.value)}
                    className='input input-bordered w-full max-w-xs my-2'
                />
                <div className='border border-gray-50 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto my-0'>
                    {attendees
                        .filter(
                            (attendee: {
                                user: {
                                    name: string;
                                    image: string;
                                    id: string;
                                };
                            }) =>
                                attendee.user.name
                                    .toLowerCase()
                                    .includes(attendeesSearch.toLowerCase())
                        )
                        .map(
                            (attendee: {
                                user: {
                                    name: string;
                                    image: string;
                                    id: string;
                                };
                            }) => (
                                <div
                                    key={attendee.user.id}
                                    className='bg-primary py-2 px-6 w-72 rounded-lg flex flex-row justify-between items-center mx-auto my-0'
                                >
                                    <div className='relative w-14 h-14 rounded-full overflow-hidden'>
                                        <Image
                                            src={attendee.user.image}
                                            className='object-cover'
                                            alt='profile picture'
                                            fill
                                        />
                                    </div>
                                    <p className='font-bold text-white'>
                                        {attendee.user.name.length > 60
                                            ? attendee.user.name.substring(
                                                  0,
                                                  60
                                              ) + "..."
                                            : attendee.user.name}
                                    </p>
                                </div>
                            )
                        )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
