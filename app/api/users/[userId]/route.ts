import getSession from "@/utils/getSession";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function PATCH(req: Request, {
    params
}: {
    params: {
        userId: string;
    }
}) {
    const session = await getSession();

    if (!session || session.user.isAdmin === false) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId } = params;

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {...body}
    });

    return NextResponse.json({ user });
}
