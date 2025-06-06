"use client";

import {
  ChartAreaIcon,
  ChevronDown,
  CreditCard,
  GalleryHorizontalEnd,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Settings,
  User2Icon,
  Verified,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useUserStore } from "../lib/store/userStore";
import type { User } from "../lib/store/userStore";

export const links = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard
  },
  {
    label: "Stories",
    href: "/stories",
    icon: GalleryHorizontalEnd
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: ChartAreaIcon
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings
  }
];

function DropDown({ isOpen }: { isOpen: boolean }) {
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
      className={`absolute top-[10%] ${
        isOpen
          ? "scale-100 opacity-100 pointer-events-auto"
          : "scale-[80%] opacity-0 pointer-events-none"
      } right-[3%] flex flex-col w-[180px] transition-all duration-[20ms] bg-bgPrimary shadow-2xl border border-border rounded-2xl`}
    >
      {links.map((link, index) => (
        <Link
          key={link.label}
          href={link.href}
          className={`flex text-base font-medium rounded-2xl flex-row-reverse justify-end w-full px-3 py-3 hover:bg-bg ${
            index === links.length - 1 ? "text-red-600" : "text-txtPrimary"
          }`}
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

function User({ user, onActive }: { user: User; onActive?: () => void }) {
  return (
    <div
      onClick={onActive}
      className="flex hover:bg-bg select-none active:scale-[0.98] transtion-all duration-[20ms] cursor-pointer py-1 px-1 flex-row items-center justify-between mt-2 bg-bgPrimary border border-border rounded-2xl w-[95%]"
    >
      <div className="flex flex-row justify-start items-center">
        <div className={`relative w-[40px] h-[40px] max-w-[40px] max-h-[40px]`}>
          <img
            className="object-cover w-full rounded-full h-full"
            src={user.avatar}
            alt={`${user.name} avatar`}
          />
          {user.isPaid && (
            <span className="absolute bottom-[-4px] right-[-2px] group isPaidTag">
              <span className="absolute bottom-0 left-[110%] hidden group-hover:block text-xs bg-bg border border-border text-txt font-medium text-nowrap px-3 py-1 rounded">
                Verified User
              </span>
              <Verified size={20} className="fill-blue-600" stroke="white" />
            </span>
          )}
        </div>
        <div className="flex flex-col ml-3">
          <h3 className="font-normal leading-4 text-base max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap">
            {user.name}
          </h3>
          <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap max-w-[130px]">
            {user.email}
          </p>
        </div>
      </div>
      <div className="pr-2">
        <span>
          <ChevronDown />
        </span>
      </div>
    </div>
  );
}

function Links() {
  return (
    <div className="flex flex-col pt-7 w-[95%]">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="flex text-txtPrimary text-base font-medium rounded-2xl flex-row-reverse justify-end w-full px-3 py-3 hover:bg-bg"
        >
          <span className="text-txtPrimary">{link.label}</span>
          <span className="mr-3">
            <link.icon className="text-txtPrimary" />
          </span>
        </Link>
      ))}
    </div>
  );
}

function UpgradeButton() {
  return (
    <Link
      href="/upgrade"
      className="w-[95%] m-2 mx-4 flex flex-row bg-primary px-4 font-semibold py-3 items-center justify-between rounded-2xl border border-primary text-txt"
    >
      Upgrade{" "}
      <span>
        <Zap />
      </span>
    </Link>
  );
}

function FeedBackButton() {
  return (
    <Link
      href="/feedback"
      className="w-[95%] m-2 mx-4 flex flex-row bg-primary px-4 font-semibold py-3 items-center justify-between rounded-2xl border border-primary text-txt"
    >
      Suggest a Feature{" "}
      <span>
        <Lightbulb />
      </span>
    </Link>
  );
}

export default function SideBar() {
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
    <div className="sticky md:flex hidden top-0 h-screen w-[280px] min-w-[280px] justify-center items-center z-50">
      <div className="w-[90%] h-[95%] bg-bgPrimary border border-border justify-between rounded-3xl relative pt-[0px] items-center flex flex-col">
        <div className="flex flex-col w-full items-center" ref={dropdownRef}>
          <User
            onActive={() => setIsDropDownMenuOpen(!isDropDownMenuOpen)}
            user={user}
          />
          <DropDown isOpen={isDropDownMenuOpen} />
          <Links />
        </div>
        {user.isPaid ? <FeedBackButton /> : <UpgradeButton />}
      </div>
    </div>
  );
}
