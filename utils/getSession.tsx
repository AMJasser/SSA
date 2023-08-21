import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth";

export default async function getSession() {
    const session = await getServerSession(authOptions);

    return session;
}