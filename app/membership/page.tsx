import Header from "@/components/Header";
import Link from "next/link";

export default function Page() {
    return (
        <div className='min-h-screen flex flex-col justify-start'>
            <Header />
            <div className='grow p-6'>
                <h2 className='font-bold text-3xl'>Membership</h2>
                <p>
                    Membership in the SSA will grant you access to all events.
                    To maintain your membership — or become a member — you will
                    have to pay the dues, and also join the{" "}
                    <Link
                        href='https://gatech.campuslabs.com/engage/organization/saudi-student-association'
                        className='underline text-blue-500'
                    >
                        Georgia Tech Roster.
                    </Link>
                </p>
                <h2 className='font-bold text-3xl mt-4'>Dues</h2>
                <p>$10 per semester. Sent using Zelle or Cash.</p>
                <p>Zelle: (470) 334-9737</p>
            </div>
        </div>
    );
}
