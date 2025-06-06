"use client";

import { Plus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import OverviewAnalytics from "./components/overviewAnalytics";
import CharsAndActivitys from "./components/CharsAndActivitys";

export default function Home() {
  return (
    <div className="rounded-tl-3xl w-full rounded-bl-3xl">
      <PageHeader
        Title="Overview"
        Subtitle="A quick look at how your stories are doing"
        cta={{ label: "Create Story", href: "/", Icon: Plus }}
      />
      <div className="pt-8">
        <OverviewAnalytics />
        <CharsAndActivitys />
      </div>
    </div>
  );
}
