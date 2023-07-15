import Button from "@/components/Button";
import { HomeIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function Sandbox() {
    return (
        <main className="mt-20 lg:ml-80">
            <div className="py-5">
                <h1 className="text-3xl font-bold">Buttons</h1>
                <div className="mt-3 flex flex-wrap gap-5">
                    <Button id="button1" accessibleLabel="Hello">
                        Hello
                    </Button>
                    <Button id="button2" accessibleLabel="Hello" icon={<HomeIcon className="h-6 w-6" />}>
                        With icon on left
                    </Button>
                    <Button
                        id="button3"
                        accessibleLabel="Hello"
                        iconPlacement="right"
                        icon={<HomeIcon className="h-6 w-6" />}
                    >
                        With icon on right
                    </Button>
                    <Button id="button4" accessibleLabel="Hello" icon={<HomeIcon className="h-6 w-6" />} />
                </div>
            </div>
        </main>
    );
}
