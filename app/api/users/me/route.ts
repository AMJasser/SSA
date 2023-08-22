import getSession from "@/utils/getSession";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: Request) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    return NextResponse.json(user);
}
