import getSession from "@/utils/getSession";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(
    req: Request,
    {
        params: { eventId, userId }
    }: {
        params: { eventId: string; userId: string };
    }
) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    let eventUser = await prisma.eventUsers.findUnique({
        where: {
            eventId_userId: {
                eventId: eventId,
                userId: userId
            }
        }
    });

    if (!eventUser) {
        eventUser = await prisma.eventUsers.create({
            data: {
                eventId: eventId,
                userId: userId
            }
        });
    }

    return NextResponse.json(eventUser);
}

export async function PATCH(
    req: Request,
    {
        params: { eventId, userId }
    }: {
        params: { eventId: string; userId: string };
    }
) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body = await req.json();

    const eventUser = await prisma.eventUsers.update({
        where: {
            eventId_userId: {
                eventId: eventId,
                userId: userId
            }
        },
        data: {
            ...body
        }
    });

    return NextResponse.json(eventUser);
}
