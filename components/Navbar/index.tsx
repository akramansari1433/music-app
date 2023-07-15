"use client";
import React from "react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { searchSongs } from "@/slices/songsSlice";
import { debounce } from "lodash";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { status, data } = useSession();

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
            <div className="fixed inset-x-3 top-3 z-10 lg:ml-3 lg:pl-72">
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
                                    <Menu.Items className="absolute right-0 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
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
            <MobileMenu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
    );
}
