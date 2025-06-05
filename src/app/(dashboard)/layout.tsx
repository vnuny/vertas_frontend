"use client";
import BottomBar from "../components/BottomBar";
import SideBar from "../components/Sidebar";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-screen bg-bg">
      <SideBar />
      <BottomBar />
      <div className="flex-1">{children}</div>
    </main>
  );
}
