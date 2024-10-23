"use client"
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu } from "react-feather";
import { useRouter } from 'next/navigation';
const Dropdown = () => {
    const router = useRouter();

    return (
        <DropdownMenu.Root >
            <DropdownMenu.Trigger asChild>
                <button
                    className="inline-flex size-[35px] items-center justify-center rounded-full bg-black  shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-blue focus:shadow-[0_0_0_2px] focus:shadow-black"
                    aria-label="Customise options"
                >
                    <Menu className="text-white" />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="border min-w-[220px] rounded-md bg-black p-[5px] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    sideOffset={5}
                >
                    <DropdownMenu.Item
                        className="group relative hover:bg-slate-500 flex h-[25px] select-none items-center rounded-[3px]
                     pl-[25px] pr-[5px] text-white13px] leading-none text-white outline-none"
                        onClick={() => router.push('/')}
                    >
                        Dashboard
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="group relative hover:bg-slate-500 flex h-[25px] select-none items-center rounded-[3px]
                     pl-[25px] pr-[5px] text-white13px] leading-none text-white outline-none"
                        onClick={() => router.push('/transactions')}
                    >
                        Transactions
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        className="group relative hover:bg-slate-500 flex h-[25px] select-none items-center rounded-[3px]
                     pl-[25px] pr-[5px] text-white13px] leading-none text-white outline-none"
                        onClick={() => router.push('/transactions/new')}
                    >
                        New Transactions
                    </DropdownMenu.Item>
                   

                    <DropdownMenu.Separator className="m-[5px] h-px bg-white" />
                    <DropdownMenu.Item
                        className="group relative hover:bg-slate-500 flex h-[25px] select-none items-center rounded-[3px]
                     pl-[25px] pr-[5px] text-white13px] leading-none text-white outline-none"
                        onClick={() => router.push('/settings')}
                    >
                        Settings
                    </DropdownMenu.Item>
                    

                    <DropdownMenu.Arrow className="fill-white" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default Dropdown;
