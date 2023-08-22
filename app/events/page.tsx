import Header from "@/components/Header";
import prisma from "@/utils/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    const events = await prisma.events.findMany({
        where: {
            date: {
                gte: new Date()
            }
        }
    });

    return (
        <div className='min-h-screen flex flex-col justify-start'>
            <Header />
            <div className='bg-primary grow p-6'>
                <div className='bg-base-100 rounded mx-auto my-0 max-w-[1000px] p-6'>
                    <h2 className='font-bold text-3xl mb-4'>Events</h2>
                    <div>
                        {events.map((event) => (
                            <div
                                className='card card-compact w-96 bg-base-100 shadow-xl'
                                key={event.id}
                            >
                                <figure>
                                    <div className='relative w-96 h-48'>
                                        <Image
                                            src={event.image}
                                            alt='event poster'
                                            fill
                                            className='object-cover'
                                        />
                                    </div>
                                </figure>
                                <div className='card-body'>
                                    <h2 className='card-title'>
                                        {event.title}
                                    </h2>
                                    <p>
                                        {/* fit to 85 characters. If more use ... */}
                                        {event.description.length > 45
                                            ? event.description.substring(
                                                  0,
                                                  45
                                              ) + "..."
                                            : event.description}
                                    </p>
                                    <div className='card-actions justify-end'>
                                        <Link
                                            href={`/events/${event.id}`}
                                            className='btn btn-primary'
                                        >
                                            VIEW
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
