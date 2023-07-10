"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { searchSongs } from "@/slices/songsSlice";
import { debounce } from "lodash";
import { HeartIcon, HomeIcon, MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { status, data } = useSession();
    const { theme, setTheme } = useTheme();

    if (status === "unauthenticated") {
        return null;
    }

    const debouncedSearch = debounce((searchValue) => {
        dispatch(searchSongs(searchValue));
    }, 500);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        debouncedSearch(searchValue);
    };

    return (
        <div>
            <div className="fixed inset-x-3 top-3  z-50 lg:ml-3 lg:pl-72">
                <div
                    className={`${status === "loading" ? "opacity-0" : ""}
                    z-40 flex h-16 items-center gap-x-4 rounded-xl bg-gray-300 dark:bg-gray-800 px-4 shadow-sm transition-all duration-300 sm:gap-x-6 sm:px-6 lg:px-8`}
                >
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <form className="relative flex flex-1 py-2">
                            <MagnifyingGlassIcon
                                className="pointer-events-none absolute inset-y-0 left-3 h-full w-5 dark:text-white"
                                aria-hidden="true"
                            />
                            <input
                                id="search-field"
                                className="block h-full w-full rounded-xl border-none bg-gray-200 dark:bg-gray-700 py-0 pl-10 pr-3 dark:text-white dark:placeholder:text-gray-200 placeholder:text-gray-700"
                                placeholder="Search..."
                                type="search"
                                name="search"
                                onChange={handleSearch}
                            />
                        </form>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative">
                                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                    {data?.user?.image && (
                                        <Image
                                            className="rounded-full object-cover"
                                            src={data.user.image}
                                            alt="profile pic"
                                            height={40}
                                            width={40}
                                            loading="eager"
                                            priority
                                        />
                                    )}
                                    <span className="hidden lg:flex lg:items-center">
                                        <span
                                            className="ml-4 text-sm font-semibold leading-6 dark:text-white"
                                            aria-hidden="true"
                                        >
                                            {data?.user?.name?.split(" ")[0]}
                                        </span>
                                        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-50 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <Menu.Item>
                                            <button
                                                onClick={() => signOut()}
                                                className={`block px-3 py-1 text-sm leading-6 text-gray-900`}
                                            >
                                                Sign out
                                            </button>
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
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
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <XMarkIcon className="h-6 w-6 dark:text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-300 dark:bg-gray-800 px-6 py-4 ring-1 ring-white/10">
                                    <div className="flex h-80 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-red-500">
                                        <h1 className="text-4xl font-bold text-white">Music App</h1>
                                    </div>
                                    <div className="flex flex-col gap-y-3 py-3">
                                        <Link
                                            className="flex flex-row items-center gap-3 rounded-md px-3 py-2 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                            href="/"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <HomeIcon className="h-6 w-6" />
                                            <span className="text-xl">Home</span>
                                        </Link>
                                        <Link
                                            className="flex flex-row items-center gap-3 rounded-md px-3 py-2 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                            href="/saved"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <HeartIcon className="h-6 w-6" />
                                            <span className="text-xl">Saved</span>
                                        </Link>
                                    </div>
                                    <div className="mt-auto flex justify-center">
                                        <button
                                            className="rounded-full border p-1"
                                            onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
                                        >
                                            {theme === "dark" ? (
                                                <SunIcon className="h-6 w-6" />
                                            ) : (
                                                <MoonIcon className="h-6 w-6" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
