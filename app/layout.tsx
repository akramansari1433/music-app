import "./globals.css";
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
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
