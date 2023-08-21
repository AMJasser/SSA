import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "@/components/Providers";
import getSession from "@/utils/getSession";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Saudi Student Association",
    description: "The Saudi Student Association at Georiga Tech."
};

export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    return (
        <html lang='en'>
            <Providers session={session}>
                <body className={roboto.className}>{children}</body>
            </Providers>
        </html>
    );
}
