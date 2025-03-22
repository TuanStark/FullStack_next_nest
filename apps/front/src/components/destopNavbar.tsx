'use client'
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Props = PropsWithChildren;

export default function DesktopNavbar(props: Props) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    const pathname = usePathname();
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });

    const isScrollDown = scrollPosition > 10;
    const isHome = pathname === "/";
    return (
        <nav className={cn(
            "hidden fixed transition-colors w-full z-50 text-white top-0 md:block",
            {
                "bg-white text-gray-700 shadow-md": isScrollDown || !isHome,
            }
        )}>
            {/* container */}
            <div className="flex items-center px-4 py-4 ">
                {props.children}
            </div>
            <hr className="border-b border-gray-100 opacity-25 " />
        </nav>
    )
}