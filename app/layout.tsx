import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import { Providers } from "./provider";

export const metadata = {
    title: "Music App",
    description: "music app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-white dark:bg-black font-mono">
                <Providers>
                    <Navbar />
                    <Sidebar />
                    <main>{children}</main>
                    <Player />
                </Providers>
            </body>
        </html>
    );
}
