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
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

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