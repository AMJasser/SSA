import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className='navbar bg-base-100'>
            <div className='flex-1'>
                <Link href="/" className=' w-24 h-16 relative'>
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
                        <Link href="/events">events</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
