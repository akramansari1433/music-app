"use client";
import Button from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage: React.FC = () => {
    const { status } = useSession();
    if (status === "authenticated") {
        return redirect("/");
    }

    return (
        <div>
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="flex h-72 w-72 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-red-500">
                    <h1 className="text-4xl font-bold text-white">Music App</h1>
                </div>
                <Button
                    id="login-button"
                    accessibleLabel="Login Button"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="my-10"
                    icon={
                        <svg className="h-6 w-6" viewBox="0 0 1024 1024" fill="currentColor" height="1em" width="1em">
                            <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" />
                        </svg>
                    }
                    iconPlacement="right"
                >
                    Login using
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
