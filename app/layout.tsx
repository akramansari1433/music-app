import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MusicPlayer from "@/components/MusicPlayer";
import { Providers } from "./provider";

export const metadata = {
    title: "Music App",
    description: "music app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-black m-3">
                <Providers>
                    <Navbar />
                    <Sidebar />
                    <main className="lg:pl-72 lg:ml-3 fixed top-20 bottom-24 inset-x-0 overflow-auto">{children}</main>
                    <MusicPlayer />
                </Providers>
            </body>
        </html>
    );
}
