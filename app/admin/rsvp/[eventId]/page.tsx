import Header from "@/components/Header";
import prisma from "@/utils/prisma";

export default async function Page({
    params: { eventId }
}: {
    params: { eventId: string };
}) {
    const attendees = await prisma.eventUsers.findMany({
        where: {
            eventId
        },
        select: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });

    return (
        <div>
            <Header />
            <div className='overflow-x-auto'>
                <table className='table'>
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendees.map(({ user }, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
