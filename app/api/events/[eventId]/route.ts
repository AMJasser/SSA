import getSession from "@/utils/getSession";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(
    req: Request,
    {
        params
    }: {
        params: {
            eventId: string;
        };
    }
) {
    const { eventId } = params;

    const event = await prisma.events.findUnique({
        where: {
            id: eventId
        }
    });

    if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
}

export async function DELETE(
    req: Request,
    {
        params
    }: {
        params: {
            eventId: string;
        };
    }
) {
    const session = await getSession();

    if (!session || session.user.isAdmin === false) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { eventId } = params;

    const event = await prisma.events.findUnique({
        where: {
            id: eventId
        }
    });

    if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await prisma.events.delete({
        where: {
            id: eventId
        }
    });

    return NextResponse.json({ message: "Event deleted" });
}

export async function PATCH(
    req: Request,
    {
        params
    }: {
        params: {
            eventId: string;
        };
    }
) {
    const session = await getSession();

    if (!session || session.user.isAdmin === false) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { eventId } = params;

    const event = await prisma.events.findUnique({
        where: {
            id: eventId
        }
    });

    if (!event) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    let body = await req.json();

    if (body.date) {
        body.date = new Date(body.date);
    }

    const updatedEvent = await prisma.events.update({
        where: {
            id: eventId
        },
        data: {
            ...body
        }
    });

    return NextResponse.json({ event: updatedEvent });
}
