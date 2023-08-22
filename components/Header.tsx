"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    return (
        <div className='navbar bg-base-100'>
            <div className='flex-1'>
                <Link href='/' className=' w-24 h-16 relative'>
                    <Image
                        src='/logo.webp'
                        className='static'
                        alt='logo'
                        fill
                    />
                </Link>
            </div>
            <div className='flex-none'>
                <ul className='menu menu-horizontal px-1'>
                    <li>
                        <Link href='/events'>events</Link>
                    </li>
                    {session && session.user.isAdmin && (
                        <li>
                            <Link href='/admin'>admin</Link>
                        </li>
                    )}
                    {
                        session ? (
                            <li>
                                <Link href='/api/auth/signout'>logout</Link>
                            </li>
                        ) : (
                            <li>
                                <Link href='/api/auth/signin'>login</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
