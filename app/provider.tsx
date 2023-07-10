"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                <ThemeProvider attribute="class" enableSystem={false}>
                    {children}
                </ThemeProvider>
            </Provider>
        </SessionProvider>
    );
}
