import { Dispatch, Fragment, SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
}

export default function Modal({ open, setOpen, children }: ModalProps) {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 overflow-y-auto z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-md" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="flex items-center justify-center min-h-screen mx-5">
                        <Dialog.Panel
                            className="relative w-full max-w-lg p-4 m-auto bg-white dark:bg-gray-700 rounded-lg shadow-xl"
                            ref={cancelButtonRef}
                        >
                            <div className="absolute right-0 top-0 p-4 sm:block">
                                <button
                                    type="button"
                                    className="rounded-md dark:text-white"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div>{children}</div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    );
}
