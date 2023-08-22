import getSession from "@/utils/getSession";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(
    req: Request,
    {
        params: { eventId }
    }: {
        params: { eventId: string; };
    }
) {
    const attendees = await prisma.eventUsers.findMany({
        where: {
            eventId: eventId,
            rsvp: true,
            anonymous: false
        },
        include: {
            user: true
        }
    });

    return NextResponse.json(attendees);
}