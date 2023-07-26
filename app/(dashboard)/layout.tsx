import Navbar from "@/components/Navbar";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";

export const metadata = {
    title: "Music App",
    description: "music app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Navbar />
            <Sidebar />
            {children}
            <Player />
        </main>
    );
}
