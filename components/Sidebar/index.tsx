import React from "react";

export default function Sidebar() {
    return (
        <div className="hidden lg:fixed lg:top-0 lg:bottom-20 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="m-3 flex grow flex-col gap-y-5 overflow-y-auto rounded-xl bg-gray-800 px-6 py-4">
                <h1 className="text-white text-4xl font-semibold">SideBar</h1>
            </div>
        </div>
    );
}
