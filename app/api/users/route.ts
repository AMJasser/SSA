import getSession from "@/utils/getSession";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: Request) {
    const session = await getSession();

    if (!session || session.user.isAdmin === false) {
        return NextResponse.json(
            { error: "Not authorized" },
            { status: 401 }
        );
    }

    const users = await prisma.user.findMany();

    return NextResponse.json({ users });
}
