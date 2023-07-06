import Navbar from "@/components/Navbar";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MusicPlayer from "@/components/MusicPlayer";

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
            <body className='bg-black m-3'>
                <Navbar />
                <Sidebar/>
                <main className="lg:pl-72 lg:ml-3">{children}</main>
                <MusicPlayer/>
            </body>
        </html>
    );
}
