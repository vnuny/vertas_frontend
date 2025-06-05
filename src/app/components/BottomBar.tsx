"use client";
import Link from "next/link";
import { links } from "./Sidebar";
import { useUserStore } from "../lib/store/userStore";
import {
  CreditCard,
  LogOut,
  Settings,
  User2Icon,
  Verified
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

function DropDownMenu({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const links = [
    {
      label: "Profile",
      href: "/profile",
      icon: User2Icon
    },
    {
      label: "Billing",
      href: "/billing",
      icon: CreditCard
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings
    },
    {
      label: "Logout",
      href: "/logout",
      icon: LogOut
    }
  ];
  return (
    <div
      className={`absolute bottom-[110%] ${
        isOpen
          ? "scale-100 opacity-100 pointer-events-auto"
          : "scale-[80%] opacity-0 pointer-events-none"
      } right-[3%] flex flex-col w-[180px] transition-all z-[999] duration-[20ms] bg-bgPrimary shadow-2xl border border-border rounded-2xl`}
    >
      {links.map((link, index) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex text-base font-medium rounded-2xl flex-row-reverse justify-end w-full px-3 py-3 hover:bg-bg ${
            index === links.length - 1 ? "text-red-600" : "text-txtPrimary"
          }`}
          onClick={(e) => {
            e.preventDefault();
            onClose();
            window.location.href = link.href;
          }}
        >
          {link.label}
          <span className="mr-3">
            <link.icon
              className={`${
                index === links.length - 1 ? "text-red-600" : "text-txtPrimary"
              }`}
            />
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function BottomBar() {
  const user = useUserStore((state) => state.user);
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropDownMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropDownMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyEvent);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return <h3>Skeleton</h3>;

  return (
    <div className="fixed inset-x-0 bottom-0 left-0 right-0 z-30 border-t border-border bg-chalk md:hidden">
      <nav className="flex py-3 px-2 bg-bg">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex flex-1 flex-col-reverse items-center text-txtPrimary text-xs font-medium rounded-2xl justify-center"
          >
            <span>{link.label}</span>
            <span className="mb-[4px]">
              <link.icon size={25} className="text-txtPrimary" />
            </span>
          </Link>
        ))}
        <div
          ref={dropdownRef}
          onClick={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}
          className="flex flex-1  flex-col select-none items-center text-txtPrimary cursor-pointer text-xs font-medium rounded-2xl justify-center"
        >
          <div
            className={`relative select-none w-[30px] h-[30px] max-w-[30px] max-h-[30px]`}
          >
            <img
              className="object-cover w-full rounded-full h-full"
              src={user.avatar}
              alt={`${user.name} avatar`}
            />
            {user.isPaid && (
              <span className="absolute bottom-[-4px] right-[-2px] group isPaidTag">
                <Verified size={14} className="fill-blue-600" stroke="white" />
              </span>
            )}
          </div>
          <span className="mt-1">Me</span>
          <DropDownMenu
            isOpen={isDropDownMenuOpen}
            onClose={() => setIsDropDownMenuOpen(false)}
          />
        </div>
      </nav>
    </div>
  );
}
