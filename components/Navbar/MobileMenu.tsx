import React from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { HeartIcon, HomeIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import Link from "../Link";
import Button from "../Button";

const navLinks = [
    { label: "Home", href: "/", icon: <HomeIcon className="h-6 w-6" /> },
    { label: "Saved", href: "/saved", icon: <HeartIcon className="h-6 w-6" /> },
];

interface MobileMenuProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function MobileMenu({ sidebarOpen, setSidebarOpen }: MobileMenuProps) {
    const { theme, setTheme } = useTheme();
    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 filter backdrop-blur-md" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <Button
                                        id="sidebar-close-button"
                                        accessibleLabel="Close Sidebar"
                                        className="-m-2.5 p-2.5 bg-transparent dark:bg-transparent"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6 dark:text-white" aria-hidden="true" />
                                    </Button>
                                </div>
                            </Transition.Child>
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-300 dark:bg-gray-800 px-6 py-4 ring-1 ring-white/10">
                                <div className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-red-500">
                                    <h1 className="text-4xl font-bold text-white">Music App</h1>
                                </div>
                                <div className="flex flex-col gap-y-3 py-3">
                                    {navLinks.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            activeClassName="bg-white dark:bg-gray-700"
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-auto flex justify-center">
                                    <Button
                                        id="desktop-theme-change-button"
                                        accessibleLabel="Theme change button"
                                        className="rounded-full border p-2"
                                        onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
                                        icon={
                                            theme === "dark" ? (
                                                <SunIcon className="h-6 w-6" />
                                            ) : (
                                                <MoonIcon className="h-6 w-6" />
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
