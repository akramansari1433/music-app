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
            <body className="bg-black">
                <Providers>
                    <Navbar />
                    <Sidebar />
                    <main className="lg:ml-[19.75rem] mx-3 my-1 fixed top-20 bottom-24 inset-x-0 overflow-auto bg-gradient-to-b from-gray-600 to-gray-900 rounded-lg">
                        {children}
                    </main>
                    <MusicPlayer />
                </Providers>
            </body>
        </html>
    );
}
