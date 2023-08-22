import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import getSession from "@/utils/getSession";

export async function GET(req: Request) {
    const events = await prisma.events.findMany();

    return NextResponse.json({ events });
}

export async function POST(req: Request) {
    const session = await getSession();

    if (!session || session.user.isAdmin === false) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, date, location, image } = body;
    
    const event = await prisma.events.create({
        data: {
            title,
            description,
            date: new Date(date),
            location,
            image
        }
    });

    return NextResponse.json({ event });
}