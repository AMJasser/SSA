import prisma from "@/utils/prisma";
import Header from "@/components/Header";
import Image from "next/image";
import format from "date-fns/format";
import RSVP from "@/components/RSVP";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
    params: { eventId }
}: {
    params: { eventId: string };
}): Promise<Metadata> {
    const event = await prisma.events.findUnique({
        where: {
            id: eventId
        }
    });

    return {
        metadataBase: new URL("https://ssa-gt.com"),
        title: event?.title,
        description: event?.description,
        openGraph: {
            title: event?.title,
            description: event?.description,
            images: [
                {
                    url: event?.image || ""
                }
            ]
        }
    };
}

export default async function Page({
    params: { eventId }
}: {
    params: { eventId: string };
}) {
    const event = await prisma.events.findUnique({
        where: {
            id: eventId
        }
    });

    return (
        <div className='min-h-screen flex flex-col justify-start'>
            <Header />
            <div className='bg-primary grow p-6'>
                <div className='bg-base-100 rounded mx-auto my-0 max-w-[1000px] p-6 text-center'>
                    <h2 className='font-bold text-3xl mb-4'>{event?.title}</h2>
                    <div className='relative w-full h-64'>
                        <Image
                            src={event?.image || ""}
                            className='object-contain'
                            alt='Event poster'
                            priority
                            fill
                            sizes='100vw'
                        />
                    </div>
                    <p className='my-4'>{event?.description}</p>
                    <p className='my-4'>
                        {format(
                            new Date(event?.date || ""),
                            "EEE MM/dd hh:mm a"
                        )}
                    </p>
                    <RSVP eventId={eventId} />
                </div>
            </div>
        </div>
    );
}
