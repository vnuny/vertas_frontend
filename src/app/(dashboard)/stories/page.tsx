"use client";

import PageHeader from "@/app/components/PageHeader";
import { Plus } from "lucide-react";

export default function Stories() {
  return (
    <div className="rounded-tl-3xl  w-full rounded-bl-3xl">
      <PageHeader
        Title="Stories"
        Subtitle="Create, organize, and track your stories"
        cta={{ label: "Create Story", href: "/", Icon: Plus }}
      />
      <div className="pt-8">
        <h2>Content</h2>
      </div>
    </div>
  );
}
