"use client";
import BottomBar from "../components/BottomBar";
import SideBar from "../components/Sidebar";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex bg-bg">
      <SideBar />
      <BottomBar />
      <div className="w-full pr-3">{children}</div>
    </main>
  );
}
