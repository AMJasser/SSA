"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <>
            <div className='flex flex-col justify-start h-screen'>
                <Header />
                <div
                    className='hero grow'
                    style={{
                        backgroundImage: "url(/group.webp)"
                    }}
                >
                    <div className='hero-overlay bg-opacity-50 bg-primary'></div>
                    <div className='hero-content text-center text-neutral-content'>
                        <div className='max-w-md'>
                            <h1 className='mb-5 text-5xl font-bold'>
                                All is One, One is All.
                            </h1>
                            <p className='mb-5'>
                                Saudi Student Association at the Georgia
                                Institute of Technology
                            </p>
                            <button
                                className='btn btn-primary'
                                onClick={() => router.push("/events")}
                            >
                                EVENTS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center p-12 text-xl'>
                The Saudi Student Association at Georgia Tech was founded
                in 2020 to provide a welcoming environment for Saudi students to
                connect with their heritage. We aim to connect with Saudi
                students who intend to attend Georgia Tech and provide them with
                the necessary information needed. Our members come from
                different backgrounds and are in a variety of disciplines.
            </div>
        </>
    );
}
